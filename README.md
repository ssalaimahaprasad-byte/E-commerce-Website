# Renzocart

Next.js 14 (App Router) · TypeScript · Tailwind · PostgreSQL + Prisma / JSON Store · Razorpay.

## Setup
```bash
npm install
npm run dev                   # http://localhost:3000
```
Dev admin: `admin@renzocart.test` (or `admin@novacart.test`) / `Admin@12345`.

## Razorpay test mode
1. Create a Razorpay account → Dashboard → switch to **Test Mode** → Settings → API Keys → generate keys.
2. Put `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID` in `.env`.
3. Webhook: Settings → Webhooks → URL `https://<public-url>/api/webhooks/razorpay` (use ngrok locally),
   events `payment.captured`, `order.paid`, `payment.failed`; set the secret as `RAZORPAY_WEBHOOK_SECRET`.
4. Use Razorpay's published test cards / test UPI (success@razorpay, failure@razorpay).

## Architecture
- Money is integer paise everywhere. Totals are computed in `lib/money.ts` and **re-computed on the server** in `/api/checkout/create-order`; the browser only sends product IDs + quantities.
- Order is created `PENDING`; it becomes `CONFIRMED`/Payment `PAID` only in `markPaid()` (lib/payments.ts) after HMAC signature verification (`/api/checkout/verify`) or a verified webhook. `markPaid` is idempotent and decrements stock in a transaction.
- Auth: bcrypt (cost 12) + signed JWT in an httpOnly, SameSite=Lax cookie. Admin routes are guarded by `middleware.ts` AND `requireAdmin()` (DB role check) in every handler.
- Cart lives in localStorage and is validated server-side at checkout.

## Test checklist
Register → browse/search/filter → add to cart → checkout (invalid PIN rejected) → pay with test card → order shows CONFIRMED/PAID → cancel a payment (order stays PENDING, can retry) → log in as admin → change order status/stock → confirm a customer gets 403 on `/api/admin/*`.

## Deploy (Vercel)
Managed Postgres (Neon/Supabase/RDS) → set all env vars in Vercel → `npx prisma migrate deploy` against prod DB → add the production webhook URL. Switch to live Razorpay keys only after KYC approval.

## Not yet implemented (honest gaps)
Email verification & forgot/reset password (needs an email provider), server-persisted carts, saved-address picker, reviews UI, wishlist, product variants UI, image upload (Cloudinary), invoices (PDF), refunds UI, coupon/banner admin UI, product create/edit form, autocomplete, automated tests, Redis-backed rate limiting, CSRF tokens beyond SameSite cookies.
