import { NextResponse, type NextRequest } from "next/server";
import { getTraining, trainings } from "@/content/academy";
import { normalizeAcademyInput, validateAcademy, type AcademyResponse } from "@/lib/academy-form";
import { deliverSubmission } from "@/lib/contact-delivery";
import { guardFormRequest } from "@/lib/form-guard";

function json(body: AcademyResponse, status: number) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

const formatLabels: Record<string, string> = {
  classroom: "Klassikaal / Classroom",
  online: "Online live",
};

export async function POST(request: NextRequest) {
  const guarded = await guardFormRequest(request);
  if ("error" in guarded) return json({ ok: false, error: guarded.error }, guarded.status);

  const input = normalizeAcademyInput(guarded.body);
  const fields = validateAcademy(
    input,
    trainings.map((training) => training.id),
  );
  if (Object.keys(fields).length) return json({ ok: false, error: "validation", fields }, 422);

  const training = getTraining(input.training);
  const trainingLabel = training ? training.name.nl : "Nog niet bekend / Not sure yet";
  const count = Number(input.participants);
  const priceLabel = !training
    ? undefined
    : training.price.unit === "per-group"
      ? `vanaf / from $${training.price.amount} per groep / per group (offerte / quote)`
      : `$${training.price.amount} p.p. x ${count} = $${training.price.amount * count} USD`;

  try {
    const result = await deliverSubmission({
      type: "academy_registration",
      subject: `AI Academy: ${trainingLabel} (${input.participants})`,
      replyTo: input.email,
      rows: [
        ["Training", trainingLabel],
        ["Naam / Name", input.name],
        ["Bedrijf / Company", input.company || undefined],
        ["E-mail", input.email],
        ["Telefoon / Phone", input.phone],
        ["Deelnemers / Participants", input.participants],
        ["Prijs / Price", priceLabel],
        ["Vorm / Format", formatLabels[input.format]],
        ["Voorkeursdatum / Preferred date", input.preferredDate || undefined],
        ["Taal / Language", input.locale.toUpperCase()],
      ],
      message: input.notes,
      payload: {
        training: input.training,
        trainingLabel,
        name: input.name,
        company: input.company || undefined,
        email: input.email,
        phone: input.phone,
        participants: count,
        priceInfo: priceLabel,
        format: input.format,
        preferredDate: input.preferredDate || undefined,
        notes: input.notes || undefined,
        locale: input.locale,
        consent: input.consent,
      },
    });
    if (result === "not_configured") return json({ ok: false, error: "not_configured" }, 503);
    return json({ ok: true, mode: result }, 200);
  } catch (error) {
    console.error("[academy] Delivery failed:", error instanceof Error ? error.message : error);
    return json({ ok: false, error: "server_error" }, 502);
  }
}

export function GET() {
  return NextResponse.json({ ok: false, error: "method_not_allowed" }, { status: 405, headers: { Allow: "POST" } });
}
