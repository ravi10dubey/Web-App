import PocketBase from 'pocketbase';
import { env } from './env.js';

export const pb = new PocketBase(env.pocketbaseUrl);

export async function authenticatePocketBaseAdmin() {
  if (!env.pocketbaseAdminEmail || !env.pocketbaseAdminPassword) return;
  await pb.admins.authWithPassword(env.pocketbaseAdminEmail, env.pocketbaseAdminPassword);
}
