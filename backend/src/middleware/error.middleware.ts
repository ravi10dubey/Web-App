import { NextFunction, Request, Response } from 'express';

export function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
  console.error('[error]', err.message);

  if (err.message.includes('Validation')) {
    return res.status(400).json({ message: err.message });
  }

  if (err.message.includes('Unauthorized') || err.message.includes('Invalid token')) {
    return res.status(401).json({ message: err.message });
  }

  if (err.message.includes('Insufficient') || err.message.includes('suspended')) {
    return res.status(403).json({ message: err.message });
  }

  return res.status(500).json({ message: 'Internal Server Error' });
}
