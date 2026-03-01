import { Request, Response } from 'express';
import { pb } from '../config/pocketbase.js';
import { createSubscriptionOrder, verifyWebhookSignature } from '../services/razorpay.service.js';

export async function createOrder(req: Request, res: Response) {
  const { planId, customerId } = req.body;
  const order = await createSubscriptionOrder(planId, customerId);
  res.json(order);
}

export async function handleWebhook(req: Request, res: Response) {
  const signature = String(req.headers['x-razorpay-signature'] || '');
  const rawBody = req.rawBody || '';

  if (!signature || !rawBody || !verifyWebhookSignature(rawBody, signature)) {
    return res.status(401).json({ message: 'Invalid signature' });
  }

  await pb.collection('webhook_logs').create({
    provider: 'razorpay',
    payload: req.body,
    status: 'processed'
  });

  return res.json({ status: 'ok' });
}

export async function subscriptionStatus(req: Request, res: Response) {
  const userId = req.user?.userId || String(req.query.userId || '');
  const subscriptions = await pb.collection('subscriptions').getList(1, 1, {
    filter: `user = \"${userId}\"`,
    sort: '-created'
  });
  return res.json(subscriptions.items[0] || null);
}
