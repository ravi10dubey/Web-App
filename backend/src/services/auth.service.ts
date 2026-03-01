import crypto from 'crypto';
import { pb } from '../config/pocketbase.js';
import { Role } from '../types/auth.js';

interface RegisterInput {
  email: string;
  password: string;
  name: string;
  role?: Role;
}

export async function registerUser(input: RegisterInput) {
  const user = await pb.collection('users').create({
    email: input.email,
    password: input.password,
    passwordConfirm: input.password,
    name: input.name,
    role: input.role || 'user',
    emailVerified: false,
    aiCredits: 20,
    suspended: false
  });

  const otpCode = generateOtp();
  await pb.collection('admin_settings').create({
    key: `otp:${user.id}`,
    value: { otpCode, expiresAt: Date.now() + 10 * 60 * 1000 }
  });

  return { user, otpCode };
}

export async function loginUser(email: string, password: string) {
  const auth = await pb.collection('users').authWithPassword(email, password);

  if (auth.record.suspended) {
    throw new Error('Account suspended');
  }

  return auth;
}

export async function verifyEmailOtp(userId: string, otp: string) {
  const otpEntries = await pb.collection('admin_settings').getList(1, 1, {
    filter: `key = \"otp:${userId}\"`,
    sort: '-created'
  });

  const record = otpEntries.items[0];
  if (!record) throw new Error('OTP not found');

  const value = record.value || {};
  if (String(value.otpCode) !== otp || Date.now() > Number(value.expiresAt || 0)) {
    throw new Error('Invalid or expired OTP');
  }

  await pb.collection('users').update(userId, { emailVerified: true });
  await pb.collection('admin_settings').delete(record.id);
}

export async function requestPasswordReset(email: string) {
  const users = await pb.collection('users').getList(1, 1, { filter: `email = \"${email}\"` });
  const user = users.items[0];
  if (!user) return { accepted: true };

  const resetToken = crypto.randomBytes(24).toString('hex');
  await pb.collection('admin_settings').create({
    key: `reset:${user.id}`,
    value: { resetToken, expiresAt: Date.now() + 15 * 60 * 1000 }
  });

  return { accepted: true, resetToken };
}

export async function resetPassword(userId: string, token: string, password: string) {
  const entries = await pb.collection('admin_settings').getList(1, 1, {
    filter: `key = \"reset:${userId}\"`,
    sort: '-created'
  });

  const record = entries.items[0];
  if (!record) throw new Error('Reset token not found');

  const value = record.value || {};
  if (String(value.resetToken) !== token || Date.now() > Number(value.expiresAt || 0)) {
    throw new Error('Invalid or expired token');
  }

  await pb.collection('users').update(userId, {
    password,
    passwordConfirm: password
  });

  await pb.collection('admin_settings').delete(record.id);
}

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}
