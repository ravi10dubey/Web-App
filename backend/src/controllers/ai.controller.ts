import { Request, Response } from 'express';
import { z } from 'zod';
import { generateStructuredInsight } from '../services/ai.service.js';

const promptSchema = z.object({
  prompt: z.string().min(10),
  reelData: z.record(z.any()).optional()
});

async function handler(req: Request, res: Response, schemaHint: string) {
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  const input = promptSchema.parse(req.body);

  const mergedPrompt = `${input.prompt}\n\nReel context: ${JSON.stringify(input.reelData || {})}`;
  const result = await generateStructuredInsight(userId, mergedPrompt, schemaHint, 1);
  return res.json(result);
}

export const generateCaption = (req: Request, res: Response) =>
  handler(req, res, 'caption:string, cta:string, tone:string');

export const generateHooks = (req: Request, res: Response) => handler(req, res, 'hooks:string[]');

export const generateHashtags = (req: Request, res: Response) => handler(req, res, 'hashtags:string[]');

export const analyzeEngagement = (req: Request, res: Response) =>
  handler(req, res, 'strengths:string[], improvements:string[], bestTimeToPost:string');

export const predictViralScore = (req: Request, res: Response) =>
  handler(req, res, 'viralScore:number, confidence:number, reasons:string[]');
