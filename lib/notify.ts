/**
 * Optional email delivery for enquiries.
 *
 * The site works without this: every enquiry is always stored in Supabase and
 * read from the admin studio's Inbox. Add the environment variables below and
 * submissions are additionally emailed — no code change required.
 *
 *   RESEND_API_KEY   – from resend.com
 *   ENQUIRY_TO_EMAIL – inbox that should receive enquiries
 *   ENQUIRY_FROM     – verified sender, e.g. "Mike Interiors <enquiries@mikeinteriors.com>"
 */
export type Enquiry = {
  name: string;
  email?: string | null;
  phone?: string | null;
  service?: string | null;
  message: string;
};

export const emailConfigured = Boolean(process.env.RESEND_API_KEY && process.env.ENQUIRY_TO_EMAIL);

function toHtml(e: Enquiry) {
  const row = (k: string, v?: string | null) =>
    v ? `<tr><td style="padding:6px 14px 6px 0;color:#6f6a61;font:14px system-ui">${k}</td><td style="padding:6px 0;font:14px system-ui"><strong>${v}</strong></td></tr>` : "";

  return `<div style="font-family:system-ui,sans-serif;max-width:600px">
    <h2 style="font-family:Georgia,serif;font-weight:400;margin:0 0 18px">New project enquiry</h2>
    <table style="border-collapse:collapse">
      ${row("Name", e.name)}
      ${row("Phone", e.phone)}
      ${row("Email", e.email)}
      ${row("Service", e.service)}
    </table>
    <p style="margin:22px 0 6px;color:#6f6a61;font:13px system-ui">Message</p>
    <p style="white-space:pre-wrap;font:15px/1.6 system-ui;margin:0">${e.message}</p>
  </div>`;
}

/** Returns true when an email was actually handed off. Never throws. */
export async function notifyNewEnquiry(e: Enquiry): Promise<boolean> {
  if (!emailConfigured) return false;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM || "Mike Interiors <onboarding@resend.dev>",
        to: [process.env.ENQUIRY_TO_EMAIL],
        reply_to: e.email || undefined,
        subject: `New enquiry — ${e.name}${e.service ? ` (${e.service})` : ""}`,
        html: toHtml(e)
      })
    });
    return res.ok;
  } catch {
    return false;
  }
}
