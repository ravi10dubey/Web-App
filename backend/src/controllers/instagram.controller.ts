import { Request, Response } from 'express';
import { pb } from '../config/pocketbase.js';
import { exchangeCodeForToken, getInstagramAuthUrl } from '../services/instagram.service.js';

export async function connectInstagram(req: Request, res: Response) {
  const state = req.user?.userId || String(req.query.state || 'secure-state');
  const url = getInstagramAuthUrl(state);
  res.json({ authUrl: url });
}

export async function instagramCallback(req: Request, res: Response) {
  const code = String(req.query.code || '');
  const state = String(req.query.state || '');
  if (!code) return res.status(400).json({ message: 'Missing code' });

  const tokenPayload = await exchangeCodeForToken(code);

  if (state) {
    await pb.collection('instagram_accounts').create({
      user: state,
      instagramId: `pending_${Date.now()}`,
      username: 'instagram_business',
      encryptedAccessToken: tokenPayload.encryptedAccessToken,
      tokenExpiresAt: new Date(Date.now() + tokenPayload.expiresIn * 1000).toISOString()
    });
  }

  return res.json({ message: 'Instagram account connected' });
}

export async function getReels(req: Request, res: Response) {
  const userId = req.user?.userId;
  const account = await pb.collection('instagram_accounts').getFirstListItem(`user = \"${userId}\"`);
  const reels = await pb.collection('reels').getList(1, 30, {
    filter: `account = \"${account.id}\"`,
    sort: '-views'
  });

  return res.json({ reels: reels.items });
}

export async function getInstagramAnalytics(req: Request, res: Response) {
  const userId = req.user?.userId;
  const account = await pb.collection('instagram_accounts').getFirstListItem(`user = \"${userId}\"`);
  const analytics = await pb.collection('analytics').getList(1, 30, {
    filter: `account = \"${account.id}\"`,
    sort: '-date'
  });

  return res.json({
    totalReels: analytics.items.length,
    data: analytics.items
  });
}
