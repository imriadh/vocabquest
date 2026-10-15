# Deploying VocabQuest

This guide explains how to deploy the app yourself. **You must use your own accounts** (GitHub + a hosting platform) — no one can deploy on your behalf without your credentials.

## ⚠️ Important: the SQLite limitation

This app currently uses **SQLite** (`prisma/schema.prisma` → `provider = "sqlite"`, file at `db/custom.db`). SQLite stores data in a local file. This works perfectly for local development, but **most serverless platforms (Vercel, Netlify) have ephemeral filesystems** — the database file resets to empty on every cold start, wiping all users, progress, and API keys.

You have two options:

### Option A — Deploy on a platform with persistent storage (easiest, keeps SQLite)

Platforms that give you a persistent disk so the SQLite file survives:

| Platform | Free tier? | Notes |
|---|---|---|
| **Railway** | Yes (trial) | Easiest. Connects your GitHub repo, runs `bun run build` + `bun run start`, gives a persistent volume. |
| **Render** | Yes (web service) | Add a persistent disk. |
| **Fly.io** | Yes (small) | Use a volume for the SQLite file. |
| **A VPS** (Hetzner, DigitalOcean) | Paid | Full control, SQLite works natively. |

### Option B — Migrate to Postgres (required for Vercel / Netlify)

If you want to deploy on Vercel or Netlify (free, easy, but serverless):

1. Create a free Postgres database on **Neon** (neon.tech) or **Supabase** (supabase.com) — both have free tiers.
2. Get the connection string (looks like `postgresql://user:pass@host/db`).
3. Edit `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"   // change from "sqlite"
     url      = env("DATABASE_URL")
   }
   ```
4. Set `DATABASE_URL` to your Postgres connection string.
5. Run `bun run db:push` to create the tables.
6. Run `bun prisma/seed.ts` to create the admin account.
7. Commit and deploy.

## Step-by-step: deploy on Railway (recommended, keeps SQLite)

### 1. Push your code to GitHub

```bash
# In the project root:
git add -A
git commit -m "Prepare for deployment"
```

Then go to **github.com → New repository**, create a repo (don't initialize with README), and follow GitHub's instructions to push:

```bash
git remote add origin https://github.com/YOUR_USERNAME/vocabquest.git
git branch -M main
git push -u origin main
```

**Do NOT commit `.env`** — it's already in `.gitignore`. Set env vars on Railway instead (step 4).

### 2. Create a Railway project

1. Go to **railway.app** → sign in with GitHub.
2. Click **New Project** → **Deploy from GitHub repo** → select your `vocabquest` repo.
3. Railway auto-detects Next.js.

### 3. Add a persistent volume (so SQLite survives)

1. In your Railway service → **Settings** → **Volumes** → **Add Volume**.
2. Mount path: `/app/db` (this is where `custom.db` lives).
3. Update `DATABASE_URL` to: `file:/app/db/custom.db`

### 4. Set environment variables

In Railway → your service → **Variables**, add:

| Variable | Value |
|---|---|
| `DATABASE_URL` | `file:/app/db/custom.db` (with the volume from step 3) |
| `NEXTAUTH_SECRET` | generate with `openssl rand -base64 32` |
| `ENCRYPTION_KEY` | generate with `openssl rand -hex 32` |

Generate the secrets locally:
```bash
openssl rand -base64 32   # for NEXTAUTH_SECRET
openssl rand -hex 32      # for ENCRYPTION_KEY
```

### 5. Set the build + start commands

Railway should auto-detect, but verify in **Settings**:
- **Build command**: `bun install && bun run db:push && bun prisma/seed.ts`
- **Start command**: `bun run start`

The `db:push` creates tables; `seed.ts` creates the admin account (`admin@vocabquest.app` / `VocabAdmin@2025`). **Change the admin password after first login.**

### 6. Deploy

Railway deploys automatically on push. Wait for the build to finish, then click the generated URL (e.g. `vocabquest-production.up.railway.app`).

### 7. Verify

- The homepage loads with 1106 vocabulary words.
- Grammar tab shows 32 lessons.
- Reading tab shows 10 passages.
- Login as admin → AI Practice tab appears.

## Step-by-step: deploy on Vercel (requires Postgres migration)

1. Follow **Option B** above to migrate to Postgres first.
2. Push to GitHub (step 1 above).
3. Go to **vercel.com** → sign in with GitHub → **New Project** → import your repo.
4. Add env vars: `DATABASE_URL` (Postgres URL), `NEXTAUTH_SECRET`, `ENCRYPTION_KEY`.
5. Vercel auto-detects Next.js. Click **Deploy**.
6. After deploy, run `bun run db:push` and `bun prisma/seed.ts` against your Postgres (from your local machine with `DATABASE_URL` set to the Postgres URL) to create tables + admin.

## Security checklist before going live

- [ ] Change the admin password (edit `prisma/seed.ts` or log in and the admin can't change password via UI yet — for now, change it in `seed.ts` and re-seed).
- [ ] Use strong `NEXTAUTH_SECRET` and `ENCRYPTION_KEY` (not the dev defaults).
- [ ] Ensure `.env` is NOT committed (check `git status` before pushing).
- [ ] The `db/custom.db` file is in `.gitignore` — verify it won't be pushed.

## What I cannot do for you

- Create a GitHub account or repository under your name.
- Log into Railway/Vercel/Render/etc. on your behalf.
- Push code to your GitHub.
- Generate API keys for external services on your behalf.

The steps above are everything you need to deploy yourself. The project is build-ready (`next.config.ts` has `output: "standalone"` and `typescript.ignoreBuildErrors: true` so the pre-existing type error won't block the build).
