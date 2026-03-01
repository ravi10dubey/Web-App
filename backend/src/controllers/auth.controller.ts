import { Request, Response } from 'express';
import { z } from 'zod';
import {
  loginUser,
  registerUser,
  requestPasswordReset,
  resetPassword,
  verifyEmailOtp
} from '../services/auth.service.js';
import { signAccessToken, signRefreshToken } from '../utils/jwt.js';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const otpSchema = z.object({
  userId: z.string().min(5),
  otp: z.string().length(6)
});

const resetRequestSchema = z.object({
  email: z.string().email()
});

const resetConfirmSchema = z.object({
  userId: z.string().min(5),
  token: z.string().min(20),
  password: z.string().min(8)
});

export async function register(req: Request, res: Response) {
  const input = registerSchema.parse(req.body);
  const { user, otpCode } = await registerUser(input);
  res.status(201).json({ user, otpCode });
}

export async function login(req: Request, res: Response) {
  const { email, password } = loginSchema.parse(req.body);
  const auth = await loginUser(email, password);
  const payload = {
    userId: auth.record.id,
    email: auth.record.email,
    role: auth.record.role
  };

  res.json({
    accessToken: signAccessToken(payload),
    refreshToken: signRefreshToken(payload),
    user: auth.record
  });
}

export async function googleAuth(_req: Request, res: Response) {
  res.json({
    message: 'Google OAuth callback integration point. Validate Google id_token and map/create PocketBase user.'
  });
}

export async function verifyOtp(req: Request, res: Response) {
  const { userId, otp } = otpSchema.parse(req.body);
  await verifyEmailOtp(userId, otp);
  res.json({ verified: true });
}

export async function passwordResetRequest(req: Request, res: Response) {
  const { email } = resetRequestSchema.parse(req.body);
  const response = await requestPasswordReset(email);
  res.json(response);
}

export async function passwordResetConfirm(req: Request, res: Response) {
  const { userId, token, password } = resetConfirmSchema.parse(req.body);
  await resetPassword(userId, token, password);
  res.json({ success: true });
}
