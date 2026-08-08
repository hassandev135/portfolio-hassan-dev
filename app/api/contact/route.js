import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/contact
 * For now this just validates and logs the payload server-side. Swap the
 * `console.log` for an email provider (Resend, Postmark) or a DB write when
 * you're ready to actually receive messages.
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  // Server-side validation (never trust the client alone).
  const errors = {};
  if (!name) errors.name = "Name is required.";
  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_RE.test(email)) errors.email = "Email is invalid.";
  if (!message || message.length < 10)
    errors.message = "Message must be at least 10 characters.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // TODO: send an email / persist the message. For now, just log it.
  console.log("[contact] new message:", { name, email, message });

  return NextResponse.json({ ok: true });
}
