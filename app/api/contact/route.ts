import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, projectType, message, honeypot } = body;

    // 1. Honeypot Spam Protection: if bot filled hidden field, fake success
    if (honeypot && String(honeypot).trim().length > 0) {
      return NextResponse.json(
        { success: true, message: "Inquiry received" },
        { status: 200 }
      );
    }

    // 2. Server-side Validation
    const cleanName = typeof name === "string" ? name.trim() : "";
    const cleanEmail = typeof email === "string" ? email.trim() : "";
    const cleanMessage = typeof message === "string" ? message.trim() : "";
    const cleanProjectType =
      typeof projectType === "string" && projectType.trim()
        ? projectType.trim()
        : "Not specified";

    if (!cleanName || cleanName.length < 2) {
      return NextResponse.json(
        { error: "Please enter a valid name (at least 2 characters)." },
        { status: 400 }
      );
    }

    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!cleanMessage || cleanMessage.length < 5) {
      return NextResponse.json(
        { error: "Please provide a message with at least 5 characters." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("RESEND_API_KEY is not configured in environment variables.");
      return NextResponse.json(
        {
          error:
            "Email service is not yet configured. Please ensure RESEND_API_KEY is added to environment variables.",
        },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);
    const toEmail = process.env.CONTACT_RECEIVER_EMAIL || "info@iuvora.com";
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "Iuvora Inquiry <onboarding@resend.dev>";

    const subject = `New Inquiry: ${cleanName} — ${cleanProjectType}`;

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111827; background-color: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb;">
        <div style="border-bottom: 2px solid #2f7bff; padding-bottom: 16px; margin-bottom: 24px;">
          <h1 style="font-size: 20px; font-weight: 700; color: #0a0a0a; margin: 0;">New Project Inquiry</h1>
          <p style="font-size: 13px; color: #6b7280; margin: 4px 0 0;">Received via iuvora.com contact form</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
          <tbody>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; width: 140px; font-weight: 600;">Client Name:</td>
              <td style="padding: 8px 0; color: #111827; font-weight: 600;">${cleanName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${cleanEmail}" style="color: #2f7bff; text-decoration: none;">${cleanEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Project Type:</td>
              <td style="padding: 8px 0; color: #111827;">${cleanProjectType}</td>
            </tr>
          </tbody>
        </table>

        <div style="background-color: #f9fafb; padding: 16px; border-radius: 6px; border: 1px solid #f3f4f6; margin-bottom: 24px;">
          <p style="font-size: 12px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px;">Project Overview / Message</p>
          <p style="font-size: 14px; line-height: 1.6; color: #1f2937; margin: 0; white-space: pre-wrap;">${cleanMessage}</p>
        </div>

        <div style="font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 16px;">
          <p style="margin: 0;">Direct reply will go to <a href="mailto:${cleanEmail}" style="color: #2f7bff;">${cleanEmail}</a>.</p>
        </div>
      </div>
    `;

    const plainText = `
New Project Inquiry - Iuvora

Client Name: ${cleanName}
Email: ${cleanEmail}
Project Type: ${cleanProjectType}

Message:
${cleanMessage}
    `.trim();

    const { error: resendError } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: cleanEmail,
      subject,
      text: plainText,
      html: htmlContent,
    });

    if (resendError) {
      console.error("Resend API error:", resendError);
      return NextResponse.json(
        { error: resendError.message || "Failed to send email via Resend." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Inquiry sent successfully." },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("Contact API internal error:", err);
    const errorMessage =
      err instanceof Error ? err.message : "An unexpected error occurred.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
