# Galassia 5: website and recruitment

Site for **Galassia 5**, the AI CubeSat from the National University of Singapore, with an application form that stores applicants in Supabase.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind · Framer Motion · Supabase (Postgres + Storage) · Vercel

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in Supabase keys (below)
npm run dev                  # http://localhost:3000
```

## 1. Set up Supabase (free tier)

1. Create a project at https://supabase.com (Free plan, region: Singapore).
2. **SQL Editor** → paste and run [`supabase/schema.sql`](supabase/schema.sql).
   This creates the `applications` table (RLS on, no public access) and a **private** `resumes` bucket (PDF only, 4 MB).
3. **Project Settings → API**: copy the **Project URL** and the **service_role** key.

## 2. Deploy on Vercel

1. Push this repo to GitHub.
2. https://vercel.com/new → import the repo. The framework auto-detects as Next.js; leave the defaults.
3. Under **Environment Variables**, add:

   | Name | Value |
   |---|---|
   | `SUPABASE_URL` | `https://<ref>.supabase.co` |
   | `SUPABASE_SERVICE_ROLE_KEY` | service_role key |
   | `NEXT_PUBLIC_SITE_URL` *(optional)* | your custom domain, for social preview links |

4. Deploy. Custom domain: Project → Settings → Domains.

## Viewing applications

- **Table Editor → applications**: every submission. Use the `status` column to track (`new`, `reviewing`, `interview`, `accepted`, `rejected`).
- **Storage → resumes**: open the file at the row's `resume_path` to download the PDF.
- Export: Table Editor → *Export to CSV*.

## How the form is secured

- The browser never talks to Supabase directly. It posts to `/api/apply`, which runs on Vercel with the service-role key (server-only env var, never sent to the client).
- RLS is enabled with no policies, so the public anon key can't read or write applicants.
- The server validates the NUS email domain (`@u.nus.edu` / `@nus.edu.sg`), the team list and field lengths, and checks that the resume is a real PDF (`%PDF-` header) under 4 MB (Vercel caps request bodies at 4.5 MB).
- One application per email (unique constraint). A honeypot field drops basic bots.

## Editing content

All copy (history, objectives, specs, sub-teams, leadership, years) lives in [`lib/content.ts`](lib/content.ts). Images are in `public/images/`.

## Supabase free-tier notes

- 500 MB database + 1 GB file storage. At ~300 KB per resume that's roughly 3,000 applicants.
- **Free projects pause after 7 days with no activity.** A paused project makes the form return "temporarily unavailable". Restore it from the dashboard, or upgrade to Pro during an active recruitment drive.
- No automatic backups on Free. Export the CSV and resumes after each recruitment round.
