import "server-only";
import type { NextRequest } from "next/server";

/** Shared protections for the public form endpoints (contact, academy). */
const MAX_BODY_BYTES = 16 * 1024;
const MIN_FILL_TIME_MS = 3_000;
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 };

export type GuardFailure = { error: "bad_request" | "rate_limited"; status: number };

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

/**
 * Validates origin, content type and size, parses the JSON body, applies the
 * honeypot / minimum fill time checks and the per-IP rate limit (shared by all
 * forms). Returns the parsed body or a failure to send back.
 */
export async function guardFormRequest(request: NextRequest): Promise<{ body: Record<string, unknown> } | GuardFailure> {
  if (!sameOrigin(request)) return { error: "bad_request", status: 403 };
  if (!request.headers.get("content-type")?.includes("application/json")) return { error: "bad_request", status: 415 };

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return { error: "bad_request", status: 413 };

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid body");
    body = parsed as Record<string, unknown>;
  } catch {
    return { error: "bad_request", status: 400 };
  }

  // Spam protection: honeypot field and a minimum time to fill in the form.
  const startedAt = typeof body.startedAt === "number" ? body.startedAt : 0;
  if ((typeof body.website === "string" && body.website.trim() !== "") || Date.now() - startedAt < MIN_FILL_TIME_MS) {
    return { error: "bad_request", status: 400 };
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return { error: "rate_limited", status: 429 };

  return { body };
}
