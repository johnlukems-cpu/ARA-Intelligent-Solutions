import { NextResponse, type NextRequest } from "next/server";
import { normalizeContactInput, validateContact, type ContactResponse } from "@/lib/contact";
import { deliverContactMessage } from "@/lib/contact-delivery";
import { getContactTopicIds } from "@/lib/contact-topics";

const MAX_BODY_BYTES = 16 * 1024;
const MIN_FILL_TIME_MS = 3_000;
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 };

/**
 * Best-effort in-memory rate limiter. It is per server instance; for
 * multi-instance or serverless deployments use a shared store (e.g. Redis).
 */
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5_000) {
    for (const [k, times] of hits) if (times.every((time) => now - time >= RATE_LIMIT.windowMs)) hits.delete(k);
  }
  return recent.length > RATE_LIMIT.max;
}

function json(body: ContactResponse, status: number) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function sameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // Non-browser clients; other checks still apply.
  try {
    const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return json({ ok: false, error: "bad_request" }, 403);
  if (!request.headers.get("content-type")?.includes("application/json")) return json({ ok: false, error: "bad_request" }, 415);

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return json({ ok: false, error: "bad_request" }, 413);

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid body");
    body = parsed as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  // Spam protection: honeypot field and a minimum time to fill in the form.
  const startedAt = typeof body.startedAt === "number" ? body.startedAt : 0;
  if ((typeof body.website === "string" && body.website.trim() !== "") || Date.now() - startedAt < MIN_FILL_TIME_MS) {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return json({ ok: false, error: "rate_limited" }, 429);

  const input = normalizeContactInput(body);
  const fields = validateContact(input, getContactTopicIds());
  if (Object.keys(fields).length) return json({ ok: false, error: "validation", fields }, 422);

  try {
    const result = await deliverContactMessage(input);
    if (result === "not_configured") return json({ ok: false, error: "not_configured" }, 503);
    return json({ ok: true, mode: result }, 200);
  } catch (error) {
    console.error("[contact] Delivery failed:", error instanceof Error ? error.message : error);
    return json({ ok: false, error: "server_error" }, 502);
  }
}

export function GET() {
  return NextResponse.json({ ok: false, error: "method_not_allowed" }, { status: 405, headers: { Allow: "POST" } });
}
