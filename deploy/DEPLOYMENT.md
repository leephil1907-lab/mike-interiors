# Render deployment — Mike Interiors

The repository contains two independent Next.js applications sharing one Supabase project.

| Render service | Root directory | Purpose |
| --- | --- | --- |
| `mike-interiors` | repository root | Public website |
| `mike-interiors-admin` | `admin` | Separate, login-protected content studio |

The admin is a separate service so its login flow and Supabase service-role key are not included in the public website bundle.

## Security before launch

**Do not use credentials copied from older versions of this document.** Previously committed deployment instructions contained credential material and a sample admin password. Treat any previously exposed service-role key as compromised: rotate it in Supabase before deploying, then set the replacement only on the admin Render service. Create or reset the admin user's password through Supabase Authentication; do not use a password from repository documentation.

Never commit environment files, service-role keys, passwords, or revalidation secrets.

## Environment variables

Set these in the Render Dashboard. Use the same Supabase project for both services.

### Website — `mike-interiors`

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Current publishable/anon key |
| `REVALIDATE_SECRET` | A newly generated long random secret |
| `NODE_VERSION` | `20.20.2` |
| `RESEND_API_KEY` | Optional; only if email delivery is enabled |
| `ENQUIRY_TO_EMAIL` | Optional destination inbox |
| `ENQUIRY_FROM` | Optional verified sender |

### Admin — `mike-interiors-admin`

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Same Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same current publishable/anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Newly rotated secret key; admin service only |
| `NEXT_PUBLIC_SITE_URL` | Public website's deployed URL |
| `REVALIDATE_SECRET` | Exactly the same value as the website |
| `NODE_VERSION` | `20.20.2` |

Generate a fresh revalidation secret locally with `openssl rand -hex 32`. Enter it directly in both Render services; do not commit it or paste it into source files.

## Deploy with the Render Blueprint

1. Confirm the latest changes are pushed to the repository's `main` branch.
2. In Render, choose **New → Blueprint** and connect `leephil1907-lab/mike-interiors`.
3. Render reads the root `render.yaml` and plans two Node.js web services.
4. Review the proposed services and settings before applying the Blueprint.
5. Supply the required environment variables in Render. Keep the service-role key on the admin service only.
6. Deploy the public website first, then set the admin's `NEXT_PUBLIC_SITE_URL` to the public service URL.
7. Configure Supabase Authentication's Site URL and allowed redirect URLs for the admin service.

Both services must be **Web Services**, not static sites. The Blueprint uses Frankfurt, Node.js 20.20.2, and the `main` branch.

## Manual deployment settings

If creating services individually, use:

| Setting | Website | Admin |
| --- | --- | --- |
| Root Directory | repository root | `admin` |
| Runtime | Node | Node |
| Build Command | `npm ci && npm run build` | `npm ci && npm run build` |
| Start Command | `npm run start -- -p $PORT` | `npm run start -- -p $PORT` |
| Health Check Path | `/` | `/login` |

## Custom domains

1. Add the public domain to the website service and configure the DNS records Render provides.
2. Add a separate studio subdomain to the admin service if desired.
3. In the studio, set `seo.site_url` to the public website's canonical domain.
4. Update the admin's `NEXT_PUBLIC_SITE_URL` if the public domain changes.

## Optional enquiry email delivery

Enquiries are stored in the database and shown in the studio Inbox. To enable email notifications, configure `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, and `ENQUIRY_FROM` on the website service.

## Post-deploy checks

- [ ] Homepage loads and assets render correctly.
- [ ] `/sitemap.xml` and `/robots.txt` respond correctly.
- [ ] WhatsApp/social sharing displays the intended title, description, and image.
- [ ] Contact form submits and the enquiry appears in the admin Inbox.
- [ ] Admin URL opens the login screen; protected routes require authentication.
- [ ] Admin sign-in works with a newly provisioned account.
- [ ] Editing site content in the studio refreshes the public website.
- [ ] The service-role key exists only in the admin service environment.

Render deploys automatically on pushes to the connected branch when auto-deploy is enabled.
