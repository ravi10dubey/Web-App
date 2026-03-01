# Horizons Deployment Guide

## 1) Provision services
1. Create a Horizons project with two services: `frontend` and `api`.
2. Attach a managed PocketBase service or deploy PocketBase as an internal service.
3. Add a scheduled task runner service for daily sync and monthly credit reset.

## 2) Environment setup
- Add all variables from `.env.example` to the API service.
- Set frontend `VITE_API_URL` to public API endpoint.
- Configure Meta OAuth callback URL to `<api-domain>/api/instagram/callback`.
- Configure Razorpay webhook URL to `<api-domain>/api/razorpay/webhook`.

## 3) Build commands
- Frontend build: `npm run build -w frontend`
- Backend build: `npm run build -w backend`

## 4) Runtime commands
- Frontend start: `npm run preview -w frontend -- --host 0.0.0.0 --port 5173`
- API start: `npm run start -w backend`

## 5) Scaling and reliability
- Run API with at least 2 replicas.
- Enable Horizons autoscaling on CPU and request latency.
- Persist PocketBase storage volume and snapshot daily.
- Route logs to Horizons log sink and alert on webhook failures.

## 6) Security hardening
- Store all secrets in Horizons secret manager.
- Rotate JWT and API secrets periodically.
- Restrict CORS to production domain only.
- Add WAF/rate limits at edge plus app-level limiter.
