"use client";

import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LoaderCircle, Send } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  UNSURE_TRAINING,
  academyFormats,
  academyLimits,
  minimumPreferredDate,
  normalizeAcademyInput,
  validateAcademy,
  type AcademyErrorCode,
  type AcademyErrors,
  type AcademyField,
  type AcademyResponse,
} from "@/lib/academy-form";
import { formatUsd } from "@/lib/price";
import { Button } from "@/components/ui/button";
import { FieldError, FieldLabel, FormAlert, SubmissionResult, inputClasses } from "./form-ui";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  training: string;
  participants: string;
  format: string;
  preferredDate: string;
  notes: string;
  consent: boolean;
  website: string;
};

const emptyState: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  training: "",
  participants: "1",
  format: "",
  preferredDate: "",
  notes: "",
  consent: false,
  website: "",
};
const fieldOrder: AcademyField[] = ["name", "company", "email", "phone", "training", "participants", "format", "preferredDate", "notes", "consent"];

type Status =
  | { type: "idle" }
  | { type: "submitting" }
  | { type: "success"; mode: "delivered" | "development" }
  | { type: "error"; message: string };

export type TrainingOption = {
  id: string;
  label: string;
  price: { amount: number; from?: boolean; unit: "per-person" | "per-group" };
};

type Props = { locale: Locale; trainings: TrainingOption[]; privacyHref: string };
type Preset = { training: string; format: string };

/**
 * ARA AI Academy registration request. Posts to /api/academy, which uses the
 * same delivery integration as the contact form (Resend or webhook).
 * Training and format can be pre-selected via ?training=…&format=…; this also
 * updates when a button on the same page changes the query string.
 */
export function AcademyForm(props: Props) {
  return (
    <Suspense fallback={<AcademyFormInner {...props} preset={{ training: "", format: "" }} />}>
      <AcademyFormWithParams {...props} />
    </Suspense>
  );
}

function AcademyFormWithParams(props: Props) {
  const params = useSearchParams();
  const training = params.get("training") ?? "";
  const format = params.get("format") ?? "";
  const preset: Preset = {
    training: props.trainings.some((option) => option.id === training) ? training : "",
    format: (academyFormats as readonly string[]).includes(format) ? format : "",
  };
  // Re-mount when the requested training/format changes, so a new choice from a button wins.
  return <AcademyFormInner key={`${preset.training}|${preset.format}`} {...props} preset={preset} />;
}

function AcademyFormInner({ locale, trainings, privacyHref, preset }: Props & { preset: Preset }) {
  const t = getDictionary(locale);
  const c = t.contact;
  const f = t.academy.form;
  const [values, setValues] = useState<FormState>(emptyState);
  const [errors, setErrors] = useState<AcademyErrors>({});
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const startedAt = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const trainingIds = trainings.map((training) => training.id);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const current: FormState = {
    ...values,
    training: values.training || preset.training,
    format: values.format || preset.format,
  };

  const minDate = minimumPreferredDate();
  const selected = trainings.find((training) => training.id === current.training);
  const participantCount = /^\d+$/.test(current.participants) ? Number(current.participants) : 0;

  const errorMessage = (error?: AcademyErrorCode): string | undefined => {
    if (!error) return undefined;
    switch (error.code) {
      case "required":
        return c.errors.required;
      case "email":
        return c.errors.email;
      case "tooShort":
        return c.errors.tooShort(error.min);
      case "tooLong":
        return c.errors.tooLong(error.max);
      case "consent":
        return c.errors.consent;
      case "phone":
        return f.errors.phone;
      case "range":
        return f.errors.range(error.min, error.max);
      case "date":
        return f.errors.date;
      default:
        return c.errors.invalid;
    }
  };

  const validate = (next: FormState) => validateAcademy(normalizeAcademyInput({ ...next, locale }), trainingIds);

  const update = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    const next = { ...current, [field]: value };
    setValues(next);
    if (errors[field as AcademyField]) {
      const fieldError = validate(next)[field as AcademyField];
      setErrors((existing) => {
        const copy = { ...existing };
        if (fieldError) copy[field as AcademyField] = fieldError;
        else delete copy[field as AcademyField];
        return copy;
      });
    }
  };

  const blur = (field: AcademyField) => {
    const value = current[field];
    if (value === "" || value === false) return;
    const fieldError = validate(current)[field];
    setErrors((existing) => {
      const copy = { ...existing };
      if (fieldError) copy[field] = fieldError;
      else delete copy[field];
      return copy;
    });
  };

  const focusFirstError = (fieldErrors: AcademyErrors) => {
    const first = fieldOrder.find((field) => fieldErrors[field]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status.type === "submitting") return;
    const fieldErrors = validate(current);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length) {
      setStatus({ type: "error", message: c.fixErrors });
      focusFirstError(fieldErrors);
      return;
    }

    setStatus({ type: "submitting" });
    try {
      const response = await fetch("/api/academy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...current, locale, startedAt: startedAt.current }),
      });
      const data = (await response.json().catch(() => null)) as AcademyResponse | null;
      if (data?.ok) {
        setStatus({ type: "success", mode: data.mode });
        setValues(emptyState);
        setErrors({});
        requestAnimationFrame(() => statusRef.current?.focus());
        return;
      }
      if (data && !data.ok && data.error === "validation") {
        setErrors(data.fields);
        setStatus({ type: "error", message: c.fixErrors });
        focusFirstError(data.fields);
        return;
      }
      const message =
        data && !data.ok && data.error === "not_configured"
          ? c.notConfigured
          : data && !data.ok && data.error === "rate_limited"
            ? c.rateLimited
            : c.genericError;
      setStatus({ type: "error", message });
    } catch {
      setStatus({ type: "error", message: c.genericError });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  if (status.type === "success") {
    return (
      <SubmissionResult
        development={status.mode === "development"}
        title={f.successTitle}
        text={f.successText}
        devTitle={c.devTitle}
        devText={f.devText}
        againLabel={f.sendAnother}
        onAgain={() => setStatus({ type: "idle" })}
        focusRef={statusRef}
      />
    );
  }

  const id = (field: AcademyField) => `academy-${field}`;
  const props = (field: AcademyField, describedBy?: string) => {
    const message = errorMessage(errors[field]);
    const ids = [describedBy, message ? `${id(field)}-error` : undefined].filter(Boolean).join(" ");
    return {
      id: id(field),
      name: field,
      "aria-invalid": message ? true : undefined,
      "aria-describedby": ids || undefined,
      onBlur: () => blur(field),
      className: inputClasses(Boolean(message)),
    };
  };
  const error = (field: AcademyField) => <FieldError id={`${id(field)}-error`} message={errorMessage(errors[field])} />;
  const submitting = status.type === "submitting";

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-busy={submitting} className="space-y-6">
      <div ref={statusRef} tabIndex={-1} aria-live="assertive" className="outline-none">
        <FormAlert message={status.type === "error" ? status.message : undefined} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor={id("name")}>{f.name}</FieldLabel>
          <input {...props("name")} type="text" autoComplete="name" maxLength={academyLimits.name.max} value={current.name} onChange={(e) => update("name", e.target.value)} />
          {error("name")}
        </div>
        <div>
          <FieldLabel htmlFor={id("company")} optionalLabel={c.optional}>
            {f.company}
          </FieldLabel>
          <input {...props("company")} type="text" autoComplete="organization" maxLength={academyLimits.company.max} value={current.company} onChange={(e) => update("company", e.target.value)} />
          {error("company")}
        </div>
        <div>
          <FieldLabel htmlFor={id("email")}>{f.email}</FieldLabel>
          <input {...props("email")} type="email" inputMode="email" autoComplete="email" maxLength={academyLimits.email.max} value={current.email} onChange={(e) => update("email", e.target.value)} />
          {error("email")}
        </div>
        <div>
          <FieldLabel htmlFor={id("phone")}>{f.phone}</FieldLabel>
          <input
            {...props("phone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={f.phoneHint}
            maxLength={academyLimits.phone.max}
            value={current.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
          {error("phone")}
        </div>
        <div className="sm:col-span-2">
          <FieldLabel htmlFor={id("training")}>{f.training}</FieldLabel>
          <select {...props("training")} value={current.training} onChange={(e) => update("training", e.target.value)}>
            <option value="">{f.trainingPlaceholder}</option>
            {trainings.map((training) => (
              <option key={training.id} value={training.id}>
                {training.label}
              </option>
            ))}
            <option value={UNSURE_TRAINING}>{f.unsure}</option>
          </select>
          {error("training")}
        </div>
        <div>
          <FieldLabel htmlFor={id("participants")}>{f.participants}</FieldLabel>
          <input
            {...props("participants")}
            type="number"
            inputMode="numeric"
            min={academyLimits.participants.min}
            max={academyLimits.participants.max}
            step={1}
            value={current.participants}
            onChange={(e) => update("participants", e.target.value)}
          />
          {error("participants")}
        </div>
        <div>
          <FieldLabel htmlFor={id("preferredDate")} optionalLabel={c.optional}>
            {f.preferredDate}
          </FieldLabel>
          <input {...props("preferredDate")} type="date" min={minDate} value={current.preferredDate} onChange={(e) => update("preferredDate", e.target.value)} />
          {error("preferredDate")}
        </div>
      </div>

      {selected ? (
        <div role="status" aria-live="polite" className="rounded-2xl bg-surface p-4 ring-1 ring-line sm:flex sm:items-center sm:justify-between sm:gap-4">
          <p className="text-sm">
            <span className="font-semibold text-midnight">{selected.label}</span>
            <span className="block text-muted">
              {selected.price.from ? `${t.pricing.from} ` : ""}
              {formatUsd(selected.price.amount, locale)} USD {selected.price.unit === "per-person" ? t.academy.perPerson : t.academy.perGroup}
            </span>
          </p>
          <p className="mt-2 text-sm sm:mt-0 sm:text-right">
            {selected.price.unit === "per-person" && participantCount > 0 ? (
              <>
                <span className="block text-muted">
                  {f.estimate} ({participantCount} × {formatUsd(selected.price.amount, locale)})
                </span>
                <span className="font-display text-2xl font-extrabold text-midnight">
                  {formatUsd(selected.price.amount * participantCount, locale)} USD
                </span>
              </>
            ) : selected.price.unit === "per-group" ? (
              <span className="font-semibold text-midnight">{f.quoteNote}</span>
            ) : null}
          </p>
        </div>
      ) : null}

      <fieldset aria-describedby={errors.format ? `${id("format")}-error` : undefined}>
        <legend className="text-sm font-semibold text-midnight">
          {f.format}
          <span aria-hidden="true" className="text-danger">
            {" "}
            *
          </span>
        </legend>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {academyFormats.map((format) => {
            const checked = current.format === format;
            return (
              <label
                key={format}
                className={
                  "flex cursor-pointer items-center gap-3 rounded-xl border bg-white px-4 py-3 text-sm font-semibold shadow-sm transition-colors has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-electric/20 " +
                  (checked ? "border-electric text-midnight ring-1 ring-electric" : errors.format ? "border-danger text-ink" : "border-line text-ink hover:border-electric")
                }
              >
                <input
                  type="radio"
                  name="format"
                  value={format}
                  checked={checked}
                  onChange={() => update("format", format)}
                  className="size-4 accent-electric"
                />
                {t.academy.formatShort[format]}
              </label>
            );
          })}
        </div>
        {error("format")}
      </fieldset>

      <div>
        <FieldLabel htmlFor={id("notes")} optionalLabel={c.optional}>
          {f.notes}
        </FieldLabel>
        <p id={`${id("notes")}-hint`} className="mt-1 text-sm text-muted">
          {f.notesHint}
        </p>
        <textarea {...props("notes", `${id("notes")}-hint`)} rows={4} maxLength={academyLimits.notes.max} value={current.notes} onChange={(e) => update("notes", e.target.value)} />
        {error("notes")}
      </div>

      {/* Honeypot: hidden from people, often filled in by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="academy-website">Website</label>
        <input id="academy-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={current.website} onChange={(e) => setValues({ ...current, website: e.target.value })} />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id={id("consent")}
            name="consent"
            type="checkbox"
            checked={current.consent}
            onChange={(e) => update("consent", e.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${id("consent")}-error` : undefined}
            className="mt-1 size-5 shrink-0 rounded border-line accent-electric"
          />
          <label htmlFor={id("consent")} className="text-sm leading-relaxed text-ink">
            {c.consent}{" "}
            <Link href={privacyHref} className="font-semibold text-electric-600 underline underline-offset-2">
              {c.privacyLink}
            </Link>
            .<span aria-hidden="true" className="text-danger"> *</span>
          </label>
        </div>
        {error("consent")}
      </div>

      <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? (
          <>
            <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
            {c.submitting}
          </>
        ) : (
          <>
            {f.submit}
            <Send aria-hidden="true" className="size-4" />
          </>
        )}
      </Button>
    </form>
  );
}
