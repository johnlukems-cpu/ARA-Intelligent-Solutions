import { NextResponse, type NextRequest } from "next/server";
import { normalizeContactInput, validateContact, type ContactResponse } from "@/lib/contact";
import { deliverContactMessage } from "@/lib/contact-delivery";
import { getContactTopicIds } from "@/lib/contact-topics";
import { guardFormRequest } from "@/lib/form-guard";

function json(body: ContactResponse, status: number) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  const guarded = await guardFormRequest(request);
  if ("error" in guarded) return json({ ok: false, error: guarded.error }, guarded.status);

  const input = normalizeContactInput(guarded.body);
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
