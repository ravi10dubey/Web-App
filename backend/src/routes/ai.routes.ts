import { Router } from 'express';
import {
  analyzeEngagement,
  generateCaption,
  generateHashtags,
  generateHooks,
  predictViralScore
} from '../controllers/ai.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { asyncHandler } from '../middleware/async.middleware.js';

export const aiRouter = Router();

aiRouter.post('/caption', authMiddleware, asyncHandler(generateCaption));
aiRouter.post('/hooks', authMiddleware, asyncHandler(generateHooks));
aiRouter.post('/hashtags', authMiddleware, asyncHandler(generateHashtags));
aiRouter.post('/analysis', authMiddleware, asyncHandler(analyzeEngagement));
aiRouter.post('/viral-score', authMiddleware, asyncHandler(predictViralScore));
