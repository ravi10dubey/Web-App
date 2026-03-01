import OpenAI from 'openai';
import { env } from '../config/env.js';
import { pb } from '../config/pocketbase.js';

const client = new OpenAI({ apiKey: env.openAiKey });

export async function generateStructuredInsight(
  userId: string,
  prompt: string,
  schemaHint: string,
  cost = 1
) {
  const user = await pb.collection('users').getOne(userId);
  const currentCredits = Number(user.aiCredits || 0);

  if (currentCredits < cost) {
    throw new Error('Insufficient AI credits');
  }

  const completion = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: `Return valid JSON only. Schema: ${schemaHint}` },
      { role: 'user', content: prompt }
    ]
  });

  await pb.collection('users').update(userId, { aiCredits: currentCredits - cost });
  await pb.collection('ai_usage').create({
    user: userId,
    creditsUsed: cost,
    promptType: schemaHint
  });

  return JSON.parse(completion.choices[0].message.content || '{}');
}
