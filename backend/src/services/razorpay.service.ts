import crypto from 'crypto';
import Razorpay from 'razorpay';
import { env } from '../config/env.js';

export const razorpay = new Razorpay({
  key_id: env.razorpayKeyId,
  key_secret: env.razorpayKeySecret
});

export async function createSubscriptionOrder(planId: string, customerId: string) {
  return razorpay.orders.create({
    amount: 1000,
    currency: 'INR',
    receipt: `${planId}-${customerId}-${Date.now()}`,
    notes: { planId, customerId }
  });
}

export function verifyWebhookSignature(rawBody: string, signature: string) {
  const digest = crypto
    .createHmac('sha256', env.razorpayWebhookSecret)
    .update(rawBody)
    .digest('hex');
  return digest === signature;
}
