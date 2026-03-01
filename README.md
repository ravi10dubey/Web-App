# InstaScale AI (Instagram-only SaaS)

Production-oriented SaaS app inspired by ReelUp/Whatmore, focused exclusively on Instagram.

## Tech Stack
- **Frontend**: React 18.2, TypeScript, TailwindCSS, shadcn-style components, Recharts
- **Backend**: Express.js + TypeScript (REST, middleware architecture)
- **Database**: PocketBase collections + indexed relations
- **AI**: OpenAI structured JSON outputs + AI credit tracking
- **Payments**: Razorpay order/webhook integration
- **Auth**: Email/password, OTP verify, Google OAuth integration point, JWT + RBAC

## Complete Folder Structure
```
backend/
  src/
    routes/
    controllers/
    services/
    middleware/
    jobs/
    utils/
    config/
    types/
frontend/
  src/
    components/
      sections/
      ui/
    lib/
pocketbase/
  schema.json
docs/
  horizons-deployment.md
```

## API Endpoints
### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/google`
- `POST /api/auth/otp`
- `POST /api/auth/password-reset/request`
- `POST /api/auth/password-reset/confirm`

### Instagram
- `GET /api/instagram/connect`
- `GET /api/instagram/callback`
- `GET /api/instagram/reels`
- `GET /api/instagram/analytics`

### AI
- `POST /api/ai/caption`
- `POST /api/ai/hooks`
- `POST /api/ai/hashtags`
- `POST /api/ai/analysis`
- `POST /api/ai/viral-score`

### Razorpay / Subscription
- `POST /api/razorpay/create-order`
- `POST /api/razorpay/webhook`
- `GET /api/subscription/status`

### Admin
- `GET /api/admin/users`
- `PUT /api/admin/user/:id/suspend`

## Implemented Production Patterns
- Security middleware (`helmet`, strict CORS, rate limiting)
- JWT auth middleware + role guard
- Async route handling + centralized error middleware
- Encrypted Instagram token storage utility
- Daily sync + monthly AI credit reset cron jobs
- Razorpay webhook signature verification using raw request body

## PocketBase Schema
See `pocketbase/schema.json` for collections:
- users, subscriptions, plans, instagram_accounts, posts, reels, analytics, ai_usage, webhook_logs, admin_settings

## Instagram OAuth Example
- Build connect URL in `backend/src/services/instagram.service.ts`
- Exchange code in callback and persist encrypted token

## OpenAI Integration Example
- `backend/src/services/ai.service.ts` enforces credits, logs usage, and requests structured JSON.

## Razorpay Integration Example
- `backend/src/services/razorpay.service.ts` creates orders and verifies signatures.

## Horizons Deployment
See `docs/horizons-deployment.md`.

## Environment Variables
Use `.env.example` and set your real values in Horizons secret manager.

## Local Run
1. `npm install`
2. `cp .env.example .env`
3. Start PocketBase and import `pocketbase/schema.json`
4. `npm run dev`
