import { Router } from 'express';
import { createOrder, handleWebhook, subscriptionStatus } from '../controllers/razorpay.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { asyncHandler } from '../middleware/async.middleware.js';

export const razorpayRouter = Router();

razorpayRouter.post('/create-order', authMiddleware, asyncHandler(createOrder));
razorpayRouter.post('/webhook', asyncHandler(handleWebhook));
razorpayRouter.get('/status', authMiddleware, asyncHandler(subscriptionStatus));
