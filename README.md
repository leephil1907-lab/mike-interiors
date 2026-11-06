# Mike Interiors

Website and private content studio for **Mike Interiors** — interior finishing
and styling in Abraka, Delta State, Nigeria.

This repository contains **two independent Next.js applications**:

| Folder | What it is | Deployed as |
| --- | --- | --- |
| `/` (root) | The public website | Render **Web Service** |
| `/admin` | The private content studio | Render **Web Service** (second one) |

They share one Supabase database. The admin is a separate service on purpose:
no admin code, login flow or service-role key ever ships in the public bundle.

---

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript
- Tailwind CSS v4 + a custom editorial design system
- Framer Motion · Lucide icons
- Supabase (Postgres + Auth + Storage)

---

## Local development

```bash
# website — http://localhost:3000
npm install
npm run dev

# studio — http://localhost:4000
cd admin
npm install
npm run dev
```

Copy `.env.example` to `.env.local` in each folder and fill in the values.

---

## What the studio manages

| Screen | Controls |
| --- | --- |
| **Projects** | Portfolio photos, titles, categories, descriptions, alt text, ordering, publish/hide, homepage feature |
| **Services** | The six service pages and the homepage service grid |
| **Site copy** | Headlines, about text, phone, address, social links, SEO title/description |
| **Inbox** | Every contact-form enquiry with call / WhatsApp / email shortcuts |

Saving calls the website's `/api/revalidate` endpoint, so edits appear within
seconds rather than waiting for the 5-minute cache window.

---

## The contact form

Validated on the client *and* server, rate limited, then stored in the
`enquiries` table and shown in the studio Inbox. Enquiries are **always** saved
to the database, so nothing is lost.

Email delivery is coded but dormant. Add three environment variables to the
website service to switch it on — no code change:

```
RESEND_API_KEY=re_...
ENQUIRY_TO_EMAIL=you@yourdomain.com
ENQUIRY_FROM=Mike Interiors <enquiries@yourdomain.com>
```

---

## SEO

- Per-page titles, descriptions and canonical URLs
- Open Graph + Twitter cards with a 1200×630 share image
- `LocalBusiness` structured data (name, phone, address, service area, socials)
- Auto-generated sitemap (30 URLs) and a robots.txt that references it
- Full icon set: favicon, 192/512 PNG, Apple touch icon, SVG, PWA manifest
- A branded 404 page that is `noindex` and offers real destinations

Set **Site copy → Search engine listing → `seo.site_url`** once the domain is
live. That single field drives canonicals, Open Graph URLs, the sitemap and
structured data together.

---

## Deployment

See **[deploy/DEPLOYMENT.md](deploy/DEPLOYMENT.md)** and
**[render.yaml](render.yaml)**.

Both apps must be **Web Services** (Node), not static sites — they rely on
server rendering, ISR, middleware and API routes.

---

## Quality checks

`tools/audit.mjs` crawls the running site and verifies links, the contact form,
layout across two viewports, the 404, and SEO. Last run: **0 problems**.
