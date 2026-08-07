# Deploy Marobix to Production (VPS + Docker + Caddy HTTPS)

> Copy-paste runbook. One block = one command. Replace `YOUR.VPS.IP` and
> `<your-password>` / `<your-admin-password>` with your real values.

---

## 0. Preflight checklist

Before you start, make sure you have:

- [ ] A VPS (Ubuntu 22.04+ recommended) with a **public IP**, SSH access, and at least 1 GB RAM.
- [ ] Your code **committed and pushed** to GitHub (`kamau-art/marobix_technologies`).
      The VPS clones from GitHub, so nothing uncommitted will be on the server.
- [ ] Your domain **`marobix.com`** — DNS is covered in step 2, but the registrar login is ready.
- [ ] Payment credentials for launch (see step 8). You can deploy with sandbox creds first
      and switch to live later — the site will work either way.

---

## 1. First SSH login + create the deploy user

```bash
ssh root@YOUR.VPS.IP
```

Create a non-root user (never run your app as root):

```bash
adduser --gecos "" deploy
usermod -aG sudo deploy
```

From **your laptop**, copy your SSH key so `deploy` can log in without a password:

```bash
ssh-copy-id deploy@YOUR.VPS.IP
```

From now on, log in as the deploy user:

```bash
ssh deploy@YOUR.VPS.IP
sudo whoami          # expect "root" (asks for the deploy password once)
```

---

## 2. Point DNS at your server

At your domain registrar, add these records for `marobix.com`:

| Type | Name | Value |
|---|---|---|
| `A` | `@` | `YOUR.VPS.IP` |
| `A` | `www` | `YOUR.VPS.IP` |

DNS can take a few minutes to a few hours to spread. Caddy needs it resolved
**before** it can issue the HTTPS certificate (step 6). Verify with:

```bash
dig +short marobix.com
dig +short www.marobix.com
```

Both should print `YOUR.VPS.IP`. (If you use Cloudflare, make sure the record is
**DNS-only** / grey cloud — not proxied — or Caddy can't get a certificate.)

---

## 3. Firewall (do this FIRST so you don't lock yourself out)

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
sudo ufw status
```

> Also allow 80/443 in your VPS provider's cloud-firewall dashboard if it has one.
> Only 22, 80 and 443 are open — the database (port 5433) stays private to the server.

---

## 4. Install Docker

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
```

Reconnect so the `docker` group applies:

```bash
exit
ssh deploy@YOUR.VPS.IP
docker --version
docker compose version
```

---

## 5. Get the code + create `.env`

```bash
git clone https://github.com/kamau-art/marobix_technologies.git marobix
cd marobix
cp .env.example .env
nano .env
```

Set these **before the first build** (`NEXT_PUBLIC_*` is baked into the image):

| Variable | What to put |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://marobix.com` — must be set before building (payment return/callback URLs are built from it) |
| `POSTGRES_USER` | `marobix` |
| `POSTGRES_PASSWORD` | **A strong password** (letters + numbers only — avoids URL-escaping issues) |
| `POSTGRES_DB` | `marobix` |
| `DATABASE_URL` | `postgres://marobix:<your-password>@db:5432/marobix` (host `db` = the compose service name) |
| `ADMIN_USERNAME` | e.g. `admin` |
| `ADMIN_PASSWORD` | A strong password (guards `/admin`) |
| `PAYPAL_ENV` | `sandbox` first → `production` for launch (see step 8) |
| `PAYPAL_CLIENT_ID` / `PAYPAL_CLIENT_SECRET` | Your PayPal REST app credentials |
| `MPESA_ENV` | `sandbox` first → `production` for launch (see step 8) |
| `MPESA_CONSUMER_KEY` / `MPESA_CONSUMER_SECRET` | Your Safaricom Daraja app credentials |
| `MPESA_SHORTCODE` | **PayBill** shortcode (STK push requires a PayBill, not BuyGoods) |
| `MPESA_PASSKEY` | LNM passkey from Safaricom |
| `MPESA_CALLBACK_URL` | `https://marobix.com/api/mpesa/callback` — public HTTPS, exact route, registered in your Safaricom app |

Save: `Ctrl+O`, `Enter`, `Ctrl+X`.

> `.env.example` ships with the current template. Note: `.env` itself is git-ignored —
> secrets never enter the repo or the Docker image (`.dockerignore` excludes `.env*`).

---

## 6. Build and start (HTTPS automatic)

```bash
docker compose up -d --build
```

First build compiles the Next.js app — allow 3–6 minutes. On success you get **three
services**: `web` (the app, bound to loopback only), `db` (PostgreSQL, data in the
`pgdata` volume), and `caddy` (reverse proxy that auto-issues a Let's Encrypt cert for
`marobix.com` + `www` and proxies 80/443 → `web:3000`).

Check everything is up and healthy:

```bash
docker compose ps
```

All `STATUS` values should be `Up` / `healthy`. If anything failed:

```bash
docker compose logs -f
```

---

## 7. Verify it's live

From your laptop:

```bash
curl -I https://marobix.com/                 # expect HTTP/1.1 200
curl -I https://marobix.com/pricing          # expect 200
curl -I https://www.marobix.com/             # expect 200 (Caddy redirects/uses same cert)
curl -I https://marobix.com/admin            # expect 401 (auth required)
```

Open `https://marobix.com` in a browser — you should see the site with a valid padlock.
Open `/admin` and log in with the `ADMIN_*` creds — it lists recent leads and orders.

The `content` table auto-seeds from `src/lib/seed.js` on the first page request, so the
site works even before any manual seeding.

---

## 8. Switch payments from sandbox to live

### M-Pesa (Safaricom Daraja)

1. In the [Safaricom Daraja portal](https://developer.safaricom.co.ke), open your app →
   **API Settings** → **Lipa na M-Pesa Online (STK Push)** and set the **Callback URL** to
   `https://marobix.com/api/mpesa/callback` (this must be exactly the same value as
   `MPESA_CALLBACK_URL`).
2. Get your **production** consumer key/secret and the **Lipa na M-Pesa (LNM) PayBill
   shortcode + passkey** from Safaricom. Sandbox values (`174379` and the `bfb2…`
   passkey) will not work in production.
3. Update `.env`, then rebuild:

```bash
nano .env        # MPESA_ENV=production, live key/secret/shortcode/passkey
docker compose up -d --build
```

> Production go-live with Safaricom usually takes 1–3 working days for approval and can
> require the callback URL to be reachable before approval is granted. Test first with
> `MPESA_ENV=sandbox` (sandbox phone `254708374149`), then flip to production.

### PayPal

1. Create a **live** REST app in the PayPal developer dashboard → get the live
   `PAYPAL_CLIENT_ID` / `PAYPAL_CLIENT_SECRET`.
2. Update `.env` and rebuild:

```bash
nano .env        # PAYPAL_ENV=production, live client id/secret
docker compose up -d --build
```

> PayPal's support for **KES** varies by merchant country — confirm your account can
> transact in KES before launch. Return URLs are HTTPS via `NEXT_PUBLIC_SITE_URL`, which
> PayPal requires for live apps.

---

## 9. Everyday operations

View logs:

```bash
docker compose logs -f
```

Restart the app:

```bash
docker compose restart
```

Update after a new push to GitHub (from the `marobix` folder):

```bash
git pull
docker compose up -d --build
```

Back up the database (leads + orders):

```bash
mkdir -p backups
docker compose exec db pg_dump -U marobix marobix > backups/backup-$(date +%F).sql
```

Restore from a backup:

```bash
cat backups/backup-2026-08-08.sql | docker compose exec -T db psql -U marobix marobix
```

Nightly backups via cron — `crontab -e` and add (note the escaped `\%F`):

```
15 3 * * * cd /home/deploy/marobix && docker compose exec -T db pg_dump -U marobix marobix > /home/deploy/marobix/backups/backup-$(date +\%F).sql
```

Stop everything (keeps data — it lives in the `pgdata` volume):

```bash
docker compose down
```

To wipe data too: `docker compose down -v` (irreversible).

---

## 10. Troubleshooting

| Symptom | Fix |
|---|---|
| `docker compose ps` shows `Restarting` | `docker compose logs web` to see the error |
| `db` keeps restarting | `docker compose logs db`; check `POSTGRES_PASSWORD` is set in `.env` |
| Browser shows an untrusted/cert error | DNS not pointing at this server yet — wait for propagation (`dig +short marobix.com`), then `docker compose restart caddy` |
| Caddy fails to get a certificate | Port 80/443 blocked, DNS not pointing here, or the domain is behind a proxy (Cloudflare orange cloud) — see step 2 |
| Site loads but checkout returns 502 | Payment creds not set yet — expected until you complete step 8 |
| M-Pesa returns "M-Pesa is not configured" | One of `MPESA_CONSUMER_KEY/SECRET/SHORTCODE/PASSKEY/CALLBACK_URL` is empty in `.env` |
| M-Pesa push never arrives on the phone | Sandbox phone must be `254708374149`; production requires `MPESA_ENV=production` + live shortcode/passkey |
| M-Pesa payment never confirms | Callback URL must be `https://marobix.com/api/mpesa/callback` and registered in the Daraja app; the site polls `stkpushquery` as a fallback after ~30s |
| Site up but pages show no content | `content` table empty and `DATABASE_URL` unreachable — `docker compose ps` + `docker compose logs db` |
| `/admin` returns 404 | `ADMIN_USERNAME`/`ADMIN_PASSWORD` not set in `.env` |
| Forms work but no leads saved | DB down — `docker compose ps` + `docker compose logs db` |
| Port 80/443 already in use | `sudo lsof -i :80` / `sudo lsof -i :443` to find the culprit |

---

## Files that make this work

- `Dockerfile` — multi-stage build (deps → build → slim runtime, non-root user)
- `docker-compose.yml` — `web` + `db` (PostgreSQL) + `caddy` (auto-HTTPS), healthchecks, auto-restart, persisted volumes
- `Caddyfile` — auto-issues Let's Encrypt TLS for `marobix.com` + `www`, proxies to `web:3000`
- `.dockerignore` — keeps secrets/build artifacts out of the image
- `next.config.mjs` — `output: "standalone"` for the slim runtime image
- `src/lib/db.js` — PostgreSQL access (content + leads + orders, auto-seeded content)
- `scripts/seed-db.mjs` — manual content reseed (`npm run seed:db`)
- `src/proxy.js` — Basic-auth gate for `/admin`
