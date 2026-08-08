"use client";

import { useState } from "react";
import { Loader2, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Section, SectionHeading } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SocialLinks } from "@/components/social-links";

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
    <Section id="contact" className="bg-muted/30">
      <SectionHeading
        eyebrow="Contact"
        title="Let's work together"
        description="Have a project in mind or just want to say hello? Send a message, or reach me directly."
      />

      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        {/* Form */}
        <form onSubmit={onSubmit} noValidate className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
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
            {errors.name ? (
              <p id="name-error" className="text-sm text-red-500">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
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
            {errors.email ? (
              <p id="email-error" className="text-sm text-red-500">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              value={values.message}
              onChange={update("message")}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              placeholder="Tell me a little about your project…"
            />
            {errors.message ? (
              <p id="message-error" className="text-sm text-red-500">
                {errors.message}
              </p>
            ) : null}
          </div>

          <Button type="submit" disabled={status === "submitting"}>
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
              <p className="flex items-center gap-2 text-sm text-accent">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                Thanks! Your message has been sent.
              </p>
            ) : null}
            {status === "error" ? (
              <p className="text-sm text-red-500">
                Something went wrong. Please try again or email me directly.
              </p>
            ) : null}
          </div>
        </form>

        {/* Direct alternatives */}
        <div className="space-y-8">
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-foreground">
              Reach me directly
            </h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-3 transition-colors hover:text-accent"
                >
                  <Mail className="h-5 w-5 text-accent" aria-hidden="true" />
                  {siteConfig.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-3">
                <MapPin className="h-5 w-5 text-accent" aria-hidden="true" />
                {siteConfig.location}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-foreground">
              Elsewhere
            </h3>
            <SocialLinks className="-ml-2.5" />
          </div>
        </div>
      </div>
    </Section>
  );
}
