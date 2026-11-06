# 🚀 DEPLOY — do this in order

## The one idea that makes this simple

Your code is in **one** GitHub repo. Render runs it as **two** services.

```
GitHub repo: leephil1907-lab/mike-interiors
│
├── app/  components/  public/     ← Service #1 reads this (repo root)
│
└── admin/  app/  components/      ← Service #2 reads ONLY this folder
```

Same repo. Two services. Each one is told which folder to look in.
That is the whole trick. Nothing is duplicated.

| | Service #1 | Service #2 |
|---|---|---|
| Name it | `mike-interiors` | `mike-interiors-admin` |
| Root Directory | *(leave empty)* | `admin` |
| You get | `mikeinteriors.com` | `admin.mikeinteriors.com` |
| Anyone can open it? | Yes | No — login required |

---

# STEP 1 — Create the website  (5 min)

1. Go to **dashboard.render.com** → sign in with GitHub
2. Click **New +** → **Web Service**
3. Find **`leephil1907-lab/mike-interiors`** → click **Connect**
4. Fill the form exactly like this:

   | Field | Type this |
   |---|---|
   | **Name** | `mike-interiors` |
   | **Region** | `Frankfurt (EU Central)` |
   | **Branch** | `main` |
   | **Root Directory** | *leave completely empty* |
   | **Runtime** | `Node` |
   | **Build Command** | `npm ci && npm run build` |
   | **Start Command** | `npm run start -- -p $PORT` |
   | **Instance Type** | `Starter` |

5. Scroll to **Environment Variables** → **Add Environment Variable** ×3:

   ```
   NEXT_PUBLIC_SUPABASE_URL        →  https://tsctqrmqdoslblozmtrx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY   →  (copy the anon key from CREDENTIALS.md)
   REVALIDATE_SECRET               →  (run: openssl rand -hex 24)
   ```

6. Click **Deploy Web Service** → wait ~4 minutes
7. When it says **Live**, copy the URL at the top.
   It looks like `https://mike-interiors-xxxx.onrender.com`

   ✅ **Your website is now online.** Open it in a browser to check.

---

# STEP 2 — Create the admin studio  (5 min)

Same repo, second service. Do **not** create a new repo.

1. **New +** → **Web Service** again
2. Pick **the same repo** `leephil1907-lab/mike-interiors` → **Connect**
3. Fill the form:

   | Field | Type this |
   |---|---|
   | **Name** | `mike-interiors-admin` |
   | **Region** | `Frankfurt (EU Central)` |
   | **Branch** | `main` |
   | **Root Directory** | `admin`  ← **← this is the only difference** |
   | **Runtime** | `Node` |
   | **Build Command** | `npm ci && npm run build` |
   | **Start Command** | `npm run start -- -p $PORT` |
   | **Instance Type** | `Starter` |

4. Environment Variables — **six** this time:

   ```
   NEXT_PUBLIC_SUPABASE_URL        →  https://tsctqrmqdoslblozmtrx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY   →  (same anon key as Step 1)
   SUPABASE_SERVICE_ROLE_KEY       →  (service role key from CREDENTIALS.md — this one is SECRET)
   NEXT_PUBLIC_SITE_URL            →  (paste the URL you copied in Step 1)
   REVALIDATE_SECRET               →  (exactly the same string as Step 1, paste it)
   ```

   ⚠️ `REVALIDATE_SECRET` must be **identical** on both services.
      Different values = your edits never appear on the live site.

5. Click **Deploy Web Service** → wait ~4 minutes
6. Copy its URL too: `https://mike-interiors-admin-xxxx.onrender.com`

---

# STEP 3 — Log in and test  (2 min)

1. Open **`https://<your-admin-url>/login`**
2. Sign in:

   ```
   Email:    admin@mikeinteriors.ng
   Password: Mi-Studio-5ocRfkodqB!
   ```

3. You should see **"Good morning, admin"**
4. Go to **Site copy** → change any headline → Save
5. Open the website → refresh → your change is there

   ✅ If the change appeared, everything is wired correctly.

6. **Change your password** in Supabase → Authentication → Users

---

# STEP 4 — Your own domain  (10 min + waiting)

1. Render → **mike-interiors** → **Settings** → **Custom Domains** → **Add**
2. Type `mikeinteriors.com` (and `www.mikeinteriors.com` as a second one)
3. Render shows you **two DNS records**. Add them where you bought the domain
   (Namecheap / GoDaddy / Whogohost → DNS settings)
4. Wait — 10 minutes to a few hours
5. Come back to Render; it flips to **Certificate issued** when it's ready
6. Do the same for the admin on `admin.mikeinteriors.com`

Then **last thing**, so Google and WhatsApp see the right address:

7. In the **admin studio** → **Site copy** → **Search engine listing**
   → `seo.site_url` → type `https://mikeinteriors.com` → Save
8. Render → **mike-interiors-admin** → **Environment** → change
   `NEXT_PUBLIC_SITE_URL` to `https://mikeinteriors.com` → **Save** (redeploys)

---

# If something goes wrong

| Symptom | Cause | Fix |
|---|---|---|
| Build fails: `Cannot find module` | Root Directory wrong | Website = empty, Admin = `admin` |
| Site loads but no photos/text | Env vars missing | Re-check the 3 vars on the website |
| Can't log in | Wrong password or not allowlisted | Use the credentials above |
| Admin edits don't show | `REVALIDATE_SECRET` mismatched | Paste the same value on both |
| "Service suspended" after 15 min | Free plan sleeping | Upgrade, or accept the first load is slow |

---

# The shortcut — do this instead of Steps 1–2  ⭐ recommended

Render → **New +** → **Blueprint** → pick `leephil1907-lab/mike-interiors`
→ **Apply**.

Render finds `render.yaml` sitting at the repo root and builds **both**
services in one go — website from the repo root, studio from `admin/`.
It then asks you to fill in the secret values below. That is the whole
deployment.

Values it will ask for:

| Variable | Website | Admin | Value |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | ✅ | `https://tsctqrmqdoslblozmtrx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | ✅ | from `CREDENTIALS.md` |
| `REVALIDATE_SECRET` | ✅ | ✅ | make one up: `openssl rand -hex 24` → **same on both** |
| `SUPABASE_SERVICE_ROLE_KEY` | — | ✅ | from `CREDENTIALS.md` (secret) |
| `NEXT_PUBLIC_SITE_URL` | — | ✅ | the website URL once it's live |
| `RESEND_API_KEY` / `ENQUIRY_TO_EMAIL` / `ENQUIRY_FROM` | optional | — | skip for now |

Then jump to **Step 3** (log in and test).

Steps 1–2 are still valid if you would rather create the two services by hand.
Both routes end in exactly the same place.
