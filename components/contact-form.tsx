"use client";

import { useState } from "react";
import { PageIntro } from "@/components/page-intro";
import { ArrowUpRight, Check, AlertCircle, Loader2 } from "lucide-react";

type Fields = { name: string; phone: string; email: string; type: string; budget: string; message: string };
type Status = "idle" | "sending" | "success" | "error";

const SERVICE_OPTIONS = [
  "Painting & finishes",
  "Wallpaper & wall panels",
  "POP ceiling",
  "TV console / feature wall",
  "Blinds & window styling",
  "Wardrobes & storage",
  "Full interior styling",
  "Something else"
];

export function ContactForm({ phone, phoneLink, whatsapp }: { phone: string; phoneLink: string; whatsapp: string }) {
  const [form, setForm] = useState<Fields>({ name: "", phone: "", email: "", type: "", budget: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields | "form", string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  function validate(): boolean {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    if (!form.phone.trim()) next.phone = "A phone number helps us reply quickly.";
    else if (!/^[\d\s+()-]{7,}$/.test(form.phone.trim())) next.phone = "That phone number doesn't look right.";
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      next.email = "Please check this email address.";
    if (form.message.trim().length < 10) next.message = "Please tell us a little about the project (10+ characters).";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    if (!validate()) {
      setStatus("error");
      document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }

    setStatus("sending");
    setErrors({});

    const message = [form.type && `Project: ${form.type}`, form.budget && `Budget: ${form.budget}`, form.message]
      .filter(Boolean)
      .join("\n\n");

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          service: form.type,
          message
        })
      });
      const json = (await res.json()) as { ok: boolean; fieldErrors?: Record<string, string>; error?: string };
      if (!res.ok || !json.ok) {
        setErrors({ ...(json.fieldErrors ?? {}), form: json.error ?? "Something went wrong." });
        setStatus("error");
        return;
      }
      setStatus("success");
      setForm({ name: "", phone: "", email: "", type: "", budget: "", message: "" });
    } catch {
      setErrors({
        form: "We couldn't reach the server. Please check your connection, or message us on WhatsApp."
      });
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <>
        <PageIntro
          eyebrow="Enquiry received"
          title={<>Thank you.<br />We'll be in touch.</>}
          intro="Your enquiry has reached Mike Interiors. We usually reply within one working day."
        />
        <section className="section-pad">
          <div className="container" style={{ maxWidth: 620 }}>
            <div className="enquiry-success">
              <Check size={26} aria-hidden />
              <h2 className="serif">Your message is with us.</h2>
              <p className="body-copy">
                If your project is urgent, you can reach us directly — WhatsApp is usually fastest.
              </p>
              <div className="enquiry-success-actions">
                <a className="btn-dark" href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp <ArrowUpRight size={15} />
                </a>
                <a className="btn-line" href={`tel:${phoneLink}`}>
                  Call {phone}
                </a>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageIntro
        eyebrow="Start a conversation"
        title={<>Let's talk about<br />your space.</>}
        intro="Tell us a little about what you have in mind. We would love to hear from you."
      />
      <section className="section-pad">
        <div className="container split">
          <div>
            <span className="eyebrow">Contact details</span>
            <h2 className="serif section-heading">We are here<br />to help you begin.</h2>
            <p className="body-copy">
              Serving Abraka and across Delta State. Share a few details and we'll come back to you with next steps.
            </p>

            <div className="contact-detail-list">
              <a href={`tel:${phoneLink}`}>
                <small>Call or text</small>
                <span>{phone}</span>
              </a>
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">
                <small>WhatsApp</small>
                <span>Message us directly</span>
              </a>
              <div>
                <small>Based in</small>
                <span>Abraka, Delta State, Nigeria</span>
              </div>
            </div>

            <p className="contact-hours">Studio hours: Monday to Saturday, 9am – 6pm</p>
          </div>

          <form onSubmit={submit} noValidate aria-label="Project enquiry form">
            {errors.form && (
              <div className="form-alert" role="alert">
                <AlertCircle size={16} aria-hidden /> {errors.form}
              </div>
            )}

            <div className="form-grid">
              <div className="field">
                <label htmlFor="name">Your name <span aria-hidden>*</span></label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={update}
                  placeholder="Name"
                  autoComplete="name"
                  aria-required="true"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && <p className="field-error" id="name-error">{errors.name}</p>}
              </div>

              <div className="field">
                <label htmlFor="phone">Phone number <span aria-hidden>*</span></label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  value={form.phone}
                  onChange={update}
                  placeholder="0803 000 0000"
                  autoComplete="tel"
                  aria-required="true"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                {errors.phone && <p className="field-error" id="phone-error">{errors.phone}</p>}
              </div>
            </div>

            <div className="form-grid">
              <div className="field">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  value={form.email}
                  onChange={update}
                  placeholder="you@example.com"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && <p className="field-error" id="email-error">{errors.email}</p>}
              </div>

              <div className="field">
                <label htmlFor="type">What do you need?</label>
                <select id="type" name="type" value={form.type} onChange={update}>
                  <option value="">Select a service</option>
                  {SERVICE_OPTIONS.map((x) => <option key={x}>{x}</option>)}
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor="budget">Estimated budget (optional)</label>
              <input
                id="budget"
                name="budget"
                value={form.budget}
                onChange={update}
                placeholder="A rough range is fine"
              />
            </div>

            <div className="field">
              <label htmlFor="message">Tell us about your project <span aria-hidden>*</span></label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={update}
                placeholder="What would you like to create? Which rooms, and roughly when?"
                rows={5}
                aria-required="true"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && <p className="field-error" id="message-error">{errors.message}</p>}
            </div>

            <button className="btn-dark" type="submit" disabled={status === "sending"}>
              {status === "sending" ? (
                <>
                  <Loader2 size={15} className="spin" aria-hidden /> Sending…
                </>
              ) : (
                <>
                  Send enquiry <ArrowUpRight size={15} />
                </>
              )}
            </button>

            <p className="form-note">
              We use your details only to reply to this enquiry. Prefer to talk? Call{" "}
              <a href={`tel:${phoneLink}`}>{phone}</a>.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
