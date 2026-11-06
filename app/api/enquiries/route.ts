import { NextResponse } from "next/server";
import { z } from "zod";
import { notifyNewEnquiry } from "@/lib/notify";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.union([z.string().trim().email("Enter a valid email address"), z.literal("")]).optional(),
  phone: z.string().trim().max(40).optional().default(""),
  service: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(10, "Please tell us a little more").max(4000)
});

/** Crude in-memory rate limit: 5 submissions per IP per 10 minutes. */
const hits = new Map<string, { count: number; reset: number }>();
const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;

function limited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW });
    return false;
  }
  entry.count += 1;
  return entry.count > LIMIT;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (limited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again later or message us on WhatsApp." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fieldErrors },
      { status: 422 }
    );
  }

  const data = parsed.data;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // 1. Always try to persist the enquiry so it is never lost.
  let stored = false;
  if (url && anon) {
    try {
      const res = await fetch(`${url}/rest/v1/enquiries`, {
        method: "POST",
        headers: {
          apikey: anon,
          Authorization: `Bearer ${anon}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal"
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email || null,
          phone: data.phone || null,
          service: data.service || null,
          message: data.message
        })
      });
      stored = res.ok;
    } catch {
      stored = false;
    }
  }

  // 2. Optionally email it (activates automatically once RESEND_API_KEY is set).
  const emailed = await notifyNewEnquiry(data);

  if (!stored && !emailed) {
    return NextResponse.json(
      { ok: false, error: "We could not send your enquiry. Please try WhatsApp or call us." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, stored, emailed });
}
