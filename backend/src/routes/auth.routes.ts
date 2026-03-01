import { Router } from 'express';
import {
  googleAuth,
  login,
  passwordResetConfirm,
  passwordResetRequest,
  register,
  verifyOtp
} from '../controllers/auth.controller.js';
import { asyncHandler } from '../middleware/async.middleware.js';

export const authRouter = Router();

authRouter.post('/register', asyncHandler(register));
authRouter.post('/login', asyncHandler(login));
authRouter.post('/google', asyncHandler(googleAuth));
authRouter.post('/otp', asyncHandler(verifyOtp));
authRouter.post('/password-reset/request', asyncHandler(passwordResetRequest));
authRouter.post('/password-reset/confirm', asyncHandler(passwordResetConfirm));
