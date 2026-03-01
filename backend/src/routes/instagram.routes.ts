import { Router } from 'express';
import {
  connectInstagram,
  getInstagramAnalytics,
  getReels,
  instagramCallback
} from '../controllers/instagram.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { asyncHandler } from '../middleware/async.middleware.js';

export const instagramRouter = Router();

instagramRouter.get('/connect', authMiddleware, asyncHandler(connectInstagram));
instagramRouter.get('/callback', asyncHandler(instagramCallback));
instagramRouter.get('/reels', authMiddleware, asyncHandler(getReels));
instagramRouter.get('/analytics', authMiddleware, asyncHandler(getInstagramAnalytics));
