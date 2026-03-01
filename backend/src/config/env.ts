import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 8080),
  appUrl: process.env.APP_URL || 'http://localhost:5173',
  jwtSecret: process.env.JWT_SECRET || 'change-me',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'change-me-refresh',
  pocketbaseUrl: process.env.POCKETBASE_URL || 'http://127.0.0.1:8090',
  pocketbaseAdminEmail: process.env.POCKETBASE_ADMIN_EMAIL || '',
  pocketbaseAdminPassword: process.env.POCKETBASE_ADMIN_PASSWORD || '',
  openAiKey: process.env.OPENAI_API_KEY || '',
  metaClientId: process.env.META_CLIENT_ID || '',
  metaClientSecret: process.env.META_CLIENT_SECRET || '',
  metaRedirectUri: process.env.META_REDIRECT_URI || '',
  razorpayKeyId: process.env.RAZORPAY_KEY_ID || '',
  razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET || '',
  razorpayWebhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET || ''
};
