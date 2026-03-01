import { Router } from 'express';
import { getUsers, suspendUser } from '../controllers/admin.controller.js';
import { authMiddleware, requireRole } from '../middleware/auth.middleware.js';
import { asyncHandler } from '../middleware/async.middleware.js';

export const adminRouter = Router();

adminRouter.get('/users', authMiddleware, requireRole('admin'), asyncHandler(getUsers));
adminRouter.put('/user/:id/suspend', authMiddleware, requireRole('admin'), asyncHandler(suspendUser));
