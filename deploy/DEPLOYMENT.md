# Render deployment — Mike Interiors

Two independent Render web services share one Supabase project.

| Service | Root directory | Purpose | Visibility |
| --- | --- | --- | --- |
| `mike-interiors` | `/` (repo root) | Public website | Public, indexed |
| `mike-interiors-admin` | `admin` | Content studio | Private, `noindex`, login required |

Both live in **one repository** — the studio is a self-contained Next.js app in
the `admin/` subfolder with its own `package.json`, so Render builds it in
isolation.

The admin is a **separate service** on purpose: no admin code, no login flow and
no service-role key ever ship in the public website's bundle.

---

## Admin login

```
URL:      https://<your-admin-service>.onrender.com
Email:    admin@mikeinteriors.ng
Password: Mi-Studio-5ocRfkodqB!
```

Change the password after your first sign-in (Supabase dashboard →
Authentication → Users → select the user → **Reset password**), then update it in
your password manager.

To add a second person later: create the user in Supabase → Authentication →
Users, **then** insert their email into the `admin_users` table. Signing in
without being on that allowlist is rejected.

---

## Environment variables

Set these in the Render dashboard (Environment tab). Never commit them.

### Website service — `mike-interiors`

| Key | Value | Required |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://tsctqrmqdoslblozmtrx.supabase.co` | yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon key (below) | yes |
| `REVALIDATE_SECRET` | any long random string — must match the admin | yes |
| `RESEND_API_KEY` | from resend.com | optional |
| `ENQUIRY_TO_EMAIL` | inbox that should receive enquiries | optional |
| `ENQUIRY_FROM` | e.g. `Mike Interiors <enquiries@yourdomain.com>` | optional |
| `NODE_VERSION` | `20.20.2` | recommended |

### Admin service — `mike-interiors-admin`

| Key | Value | Required |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://tsctqrmqdoslblozmtrx.supabase.co` | yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon key (below) | yes |
| `SUPABASE_SERVICE_ROLE_KEY` | service role key (below) — **admin only** | yes |
| `NEXT_PUBLIC_SITE_URL` | the deployed website URL | yes |
| `REVALIDATE_SECRET` | same value as the website | yes |
| `NODE_VERSION` | `20.20.2` | recommended |

### Keys

```
# anon — safe to expose, protected by Row Level Security
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzY3Rxcm1xZG9zbGJsb3ptdHJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM5MTYzNDcsImV4cCI6MjEwOTQ5MjM0N30.6DkzUH_ZxK9OoBcDmWLrH2e3Go3doBTYwI1_VZtd9w8

# service role — SECRET. Admin service only. Never on the website.
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzY3Rxcm1xZG9zbGJsb3ptdHJ4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MzkxNjM0NywiZXhwIjoyMTA5NDkyMzQ3fQ.OT8kJdt2i7xr4Gs9_OdvNnChV0LmmfD8KAoZTliv-W4
```

`REVALIDATE_SECRET` is yours to invent — generate one with:

```bash
openssl rand -hex 24
```

It is how the studio tells the website to refresh its cache after an edit, so
**the value must be identical on both services**.

---

## 1. Push the repo

```
/
├── app/                  # public website source
├── components/
├── lib/
├── public/
├── admin/                # private studio (separate Next.js app)
│   ├── app/
│   ├── components/
│   └── package.json
├── deploy/
│   ├── render.yaml
│   └── DEPLOYMENT.md
└── README.md
```

Both `.env.local` files and `CREDENTIALS.md` are gitignored — confirm with
`git status` before pushing.

## 2. Create the services

### Option A — Blueprint (fewer clicks)

1. Push to GitHub.
2. Render → **New** → **Blueprint** → choose the repo.
3. Render reads `deploy/render.yaml` and creates both services
   (website from the repo root, studio from `admin/`).
4. Fill in the `sync: false` variables it asks for.

### Option B — Two Web Services

For **each** service: Render → **New** → **Web Service** → pick the repo.

| Setting | Website | Admin |
| --- | --- | --- |
| Root Directory | *(leave blank / repo root)* | `admin` |
| Runtime | Node | Node |
| Build Command | `npm ci && npm run build` | `npm ci && npm run build` |
| Start Command | `npm run start -- -p $PORT` | `npm run start -- -p $PORT` |
| Health Check Path | `/` | `/login` |

Use a **Web Service**, not a Static Site — both need a Node server for SSR, ISR
and the login middleware.

## 3. Order of operations

1. Deploy the **website** first; copy its URL.
2. Deploy the **admin** with `NEXT_PUBLIC_SITE_URL` set to that URL.
3. Supabase → Authentication → **URL Configuration** → set Site URL to the admin
   URL so password-reset emails point somewhere sensible.

## 4. Add the domain

1. Website service → **Settings → Custom Domains** → add `mikeinteriors.com`
   and `www`, then set the DNS records Render shows you.
2. Admin service → Custom Domains → add `studio.mikeinteriors.com`.
3. In the studio: **Site copy → Search engine listing → `seo.site_url`** →
   set it to `https://mikeinteriors.com`. That single field drives canonical
   tags, Open Graph URLs, the sitemap and structured data.
4. Update `NEXT_PUBLIC_SITE_URL` on the admin service to the new site URL and
   redeploy.
5. Render provisions TLS automatically for both hosts.
6. Submit `https://mikeinteriors.com/sitemap.xml` in Google Search Console.

## 5. Turn on enquiry emails (optional, later)

Every enquiry is already stored in the database and visible in the studio
**Inbox**. To also receive them by email:

1. Create a free account at resend.com and verify your sending domain.
2. Add `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL` and `ENQUIRY_FROM` to the **website**
   service and redeploy.

No code changes needed — the sending logic is already in place and dormant.

## 6. Post-deploy checklist

- [ ] `/sitemap.xml` lists 30 URLs
- [ ] `/robots.txt` allows crawling and references the sitemap
- [ ] Sharing the homepage on WhatsApp shows the title, description and image
- [ ] Contact form shows the success panel and the enquiry appears in the Inbox
- [ ] The admin URL shows the login screen; `/projects` redirects to it
- [ ] Signing in reaches the dashboard
- [ ] Editing copy in the studio appears on the live site within seconds

## Notes

- Render's **free** instance sleeps after inactivity, so the first request is
  slow (10–50s). Use `starter` for the public site; the admin is used
  occasionally so free is usually fine.
- Pick a region close to your visitors — `frankfurt` is set in the blueprint,
  which is a reasonable default for Nigeria. `oregon` is cheaper but adds
  latency.
- Deploys are automatic on push to the connected branch.
