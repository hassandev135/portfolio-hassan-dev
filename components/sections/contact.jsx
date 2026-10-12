"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, MapPin, Send } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Section, SectionHeading } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SocialLinks } from "@/components/social-links";
import { Reveal } from "@/components/motion/reveal";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(values.email))
    errors.email = "Please enter a valid email address.";
  if (!values.message.trim()) errors.message = "Please enter a message.";
  else if (values.message.trim().length < 10)
    errors.message = "Message should be at least 10 characters.";
  return errors;
}

/** Field wrapper: label, underline control, and its error message. */
function Field({ id, label, error, children }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-hue-2">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Contact() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const update = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="contact" className="border-t border-border">
      <SectionHeading
        index="05"
        eyebrow="Contact"
        title={
          <>
            Let&apos;s work <span className="text-accent">together</span>
          </>
        }
        description="Have a project in mind or just want to say hello? Send a message, or reach me directly."
      />

      <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-24">
        {/* ── Direct contact, set as the headline act ── */}
        <Reveal>
          {siteConfig.availability ? (
            <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-border bg-card py-1.5 pl-2.5 pr-4 text-xs font-medium tracking-tight">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-hue-3 opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-hue-3" />
              </span>
              {siteConfig.availability}
            </p>
          ) : null}

          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-block font-display text-2xl font-semibold leading-tight tracking-tight break-all bg-[linear-gradient(currentColor,currentColor)] bg-size-[0%_1px] bg-bottom-left bg-no-repeat transition-[color,background-size] duration-300 ease-out-soft hover:bg-size-[100%_1px] focus-visible:bg-size-[100%_1px] hover:text-accent sm:text-3xl"
          >
            {siteConfig.email}
          </a>

          {siteConfig.location ? (
            <p className="mt-6 flex items-center gap-2.5 text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              {siteConfig.location}
            </p>
          ) : null}

          <div className="mt-10 border-t border-border pt-8">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Elsewhere
            </h3>
            <SocialLinks className="-ml-2.5" />
          </div>
        </Reveal>

        {/* ── Form ── */}
        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} noValidate className="space-y-8">
            <Field id="name" label="Name" error={errors.name}>
              <Input
                id="name"
                name="name"
                autoComplete="name"
                value={values.name}
                onChange={update("name")}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                placeholder="Jane Doe"
              />
            </Field>

            <Field id="email" label="Email" error={errors.email}>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={update("email")}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                placeholder="jane@example.com"
              />
            </Field>

            <Field id="message" label="Message" error={errors.message}>
              <Textarea
                id="message"
                name="message"
                value={values.message}
                onChange={update("message")}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                placeholder="Tell me a little about your project…"
              />
            </Field>

            <Button type="submit" size="lg" disabled={status === "submitting"}>
              {status === "submitting" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Send message
                </>
              )}
            </Button>

            {/* Status messages, announced to screen readers. */}
            <div aria-live="polite">
              {status === "success" ? (
                <p className="flex items-center gap-2 text-sm text-hue-3">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  Thanks! Your message has been sent.
                </p>
              ) : null}
              {status === "error" ? (
                <p className="text-sm text-hue-2">
                  Something went wrong. Please try again or email me directly.
                </p>
              ) : null}
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
