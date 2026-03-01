import { Request, Response } from 'express';
import { pb } from '../config/pocketbase.js';

export async function getUsers(_req: Request, res: Response) {
  const users = await pb.collection('users').getList(1, 100, { sort: '-created' });
  res.json(users.items);
}

export async function suspendUser(req: Request, res: Response) {
  const id = req.params.id;
  await pb.collection('users').update(id, { suspended: true });
  res.json({ message: 'User suspended' });
}
