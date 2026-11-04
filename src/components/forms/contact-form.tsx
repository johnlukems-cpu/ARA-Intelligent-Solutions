"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { LoaderCircle, Send, TriangleAlert } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  OTHER_TOPIC,
  contactLimits,
  normalizeContactInput,
  validateContact,
  type ContactErrorCode,
  type ContactErrors,
  type ContactField,
  type ContactResponse,
} from "@/lib/contact";
import type { TopicGroup } from "@/lib/contact-topics";
import { cn } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { FormAlert, SubmissionResult } from "./form-ui";

type FormState = {
  name: string;
  email: string;
  company: string;
  subject: string;
  topic: string;
  message: string;
  consent: boolean;
  website: string;
};

const emptyState: FormState = { name: "", email: "", company: "", subject: "", topic: "", message: "", consent: false, website: "" };
const noopSubscribe = () => () => {};
const fieldOrder: ContactField[] = ["name", "email", "company", "subject", "topic", "message", "consent"];

type Status =
  | { type: "idle" }
  | { type: "submitting" }
  | { type: "success"; mode: "delivered" | "development" }
  | { type: "error"; message: string };

const inputClass =
  "mt-2 block w-full rounded-xl border bg-white px-4 py-3 text-ink shadow-sm transition-colors placeholder:text-muted/70 focus:outline-none focus-visible:ring-4";

export function ContactForm({
  locale,
  topicGroups,
  privacyHref,
  defaultTopic,
}: {
  locale: Locale;
  topicGroups: TopicGroup[];
  privacyHref: string;
  /** Topic selected when the URL does not request one (e.g. on a division page). */
  defaultTopic?: string;
}) {
  const t = getDictionary(locale);
  const c = t.contact;
  const [values, setValues] = useState<FormState>(emptyState);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const startedAt = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const allowedTopics = [...topicGroups.flatMap((g) => g.options.map((o) => o.value)), OTHER_TOPIC];

  // Record when the form was first shown (used for basic bot detection).
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Pre-select a topic from ?topic= (e.g. links from service and product pages).
  const search = useSyncExternalStore(
    noopSubscribe,
    () => window.location.search,
    () => "",
  );
  const requestedTopic = useMemo(() => {
    const requested = new URLSearchParams(search).get("topic");
    return requested && allowedTopics.includes(requested) ? requested : "";
    // allowedTopics is derived from props that do not change during the form's lifetime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  const current: FormState = { ...values, topic: values.topic || requestedTopic || defaultTopic || "" };

  const errorMessage = (error?: ContactErrorCode): string | undefined => {
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
      default:
        return c.errors.invalid;
    }
  };

  const validate = (next: FormState) => validateContact(normalizeContactInput({ ...next, locale }), allowedTopics);

  const update = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    const next = { ...current, [field]: value };
    setValues(next);
    if (touched[field as ContactField] || errors[field as ContactField]) {
      const nextErrors = validate(next);
      setErrors((existing) => {
        const copy = { ...existing };
        const fieldError = nextErrors[field as ContactField];
        if (fieldError) copy[field as ContactField] = fieldError;
        else delete copy[field as ContactField];
        return copy;
      });
    }
  };

  const blur = (field: ContactField) => {
    setTouched((existing) => ({ ...existing, [field]: true }));
    const fieldError = validate(current)[field];
    setErrors((existing) => {
      const copy = { ...existing };
      if (fieldError && (current[field] !== "" || existing[field])) copy[field] = fieldError;
      else if (!fieldError) delete copy[field];
      return copy;
    });
  };

  const focusFirstError = (fieldErrors: ContactErrors) => {
    const first = fieldOrder.find((field) => fieldErrors[field]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status.type === "submitting") return;
    const fieldErrors = validate(current);
    setErrors(fieldErrors);
    setTouched(Object.fromEntries(fieldOrder.map((f) => [f, true])));
    if (Object.keys(fieldErrors).length) {
      setStatus({ type: "error", message: c.fixErrors });
      focusFirstError(fieldErrors);
      return;
    }

    setStatus({ type: "submitting" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...current, locale, startedAt: startedAt.current }),
      });
      const data = (await response.json().catch(() => null)) as ContactResponse | null;
      if (data?.ok) {
        setStatus({ type: "success", mode: data.mode });
        setValues(emptyState);
        setErrors({});
        setTouched({});
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
        title={c.successTitle}
        text={c.successText}
        devTitle={c.devTitle}
        devText={c.devText}
        againLabel={c.sendAnother}
        onAgain={() => setStatus({ type: "idle" })}
        focusRef={statusRef}
      />
    );
  }

  const fieldProps = (field: ContactField) => {
    const error = errorMessage(errors[field]);
    return {
      id: `contact-${field}`,
      name: field,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `contact-${field}-error` : undefined,
      onBlur: () => blur(field),
      className: cn(
        inputClass,
        error ? "border-danger focus-visible:ring-danger/20" : "border-line focus:border-electric focus-visible:ring-electric/20",
      ),
    };
  };

  const renderError = (field: ContactField) => {
    const message = errorMessage(errors[field]);
    return message ? (
      <p id={`contact-${field}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-danger">
        <TriangleAlert aria-hidden="true" className="size-4 shrink-0" />
        {message}
      </p>
    ) : null;
  };

  const renderLabel = (field: ContactField, children: React.ReactNode, optional?: boolean) => (
    <label htmlFor={`contact-${field}`} className="text-sm font-semibold text-midnight">
      {children}
      {optional ? <span className="font-normal text-muted"> ({c.optional})</span> : <span aria-hidden="true" className="text-danger"> *</span>}
    </label>
  );

  const submitting = status.type === "submitting";

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-busy={submitting} className="space-y-6">
      <div ref={statusRef} tabIndex={-1} aria-live="assertive" className="outline-none">
        <FormAlert message={status.type === "error" ? status.message : undefined} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          {renderLabel("name", c.name)}
          <input
            {...fieldProps("name")}
            type="text"
            autoComplete="name"
            required
            maxLength={contactLimits.name.max}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
          />
          {renderError("name")}
        </div>
        <div>
          {renderLabel("email", c.email)}
          <input
            {...fieldProps("email")}
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={contactLimits.email.max}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
          />
          {renderError("email")}
        </div>
        <div>
          {renderLabel("company", c.company, true)}
          <input
            {...fieldProps("company")}
            type="text"
            autoComplete="organization"
            maxLength={contactLimits.company.max}
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
          />
          {renderError("company")}
        </div>
        <div>
          {renderLabel("topic", c.service)}
          <select {...fieldProps("topic")} required value={current.topic} onChange={(e) => update("topic", e.target.value)}>
            <option value="">{c.servicePlaceholder}</option>
            {topicGroups.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </optgroup>
            ))}
            <option value={OTHER_TOPIC}>{c.serviceOther}</option>
          </select>
          {renderError("topic")}
        </div>
      </div>

      <div>
        {renderLabel("subject", c.subject)}
        <input
          {...fieldProps("subject")}
          type="text"
          required
          maxLength={contactLimits.subject.max}
          value={values.subject}
          onChange={(e) => update("subject", e.target.value)}
        />
        {renderError("subject")}
      </div>

      <div>
        {renderLabel("message", c.message)}
        <p id="contact-message-hint" className="mt-1 text-sm text-muted">
          {c.messageHint}
        </p>
        <textarea
          {...fieldProps("message")}
          aria-describedby={cn("contact-message-hint", errors.message && "contact-message-error") || undefined}
          rows={6}
          required
          maxLength={contactLimits.message.max}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
        />
        <div className="flex items-start justify-between gap-4">
          {renderError("message")}
          <p className="mt-1.5 ml-auto text-xs text-muted" aria-hidden="true">
            {values.message.length}/{contactLimits.message.max}
          </p>
        </div>
      </div>

      {/* Honeypot: hidden from people, often filled in by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => setValues({ ...current, website: e.target.value })}
        />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id="contact-consent"
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => update("consent", e.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "contact-consent-error" : undefined}
            className="mt-1 size-5 shrink-0 rounded border-line accent-electric"
          />
          <label htmlFor="contact-consent" className="text-sm leading-relaxed text-ink">
            {c.consent}{" "}
            <Link href={privacyHref} className="font-semibold text-electric-600 underline underline-offset-2">
              {c.privacyLink}
            </Link>
            .<span aria-hidden="true" className="text-danger"> *</span>
          </label>
        </div>
        {renderError("consent")}
      </div>

      <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? (
          <>
            <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
            {c.submitting}
          </>
        ) : (
          <>
            {c.submit}
            <Send aria-hidden="true" className="size-4" />
          </>
        )}
      </Button>
    </form>
  );
}
