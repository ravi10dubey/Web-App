import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { env } from './config/env.js';
import { adminRouter } from './routes/admin.routes.js';
import { aiRouter } from './routes/ai.routes.js';
import { authRouter } from './routes/auth.routes.js';
import { instagramRouter } from './routes/instagram.routes.js';
import { razorpayRouter } from './routes/razorpay.routes.js';
import { errorMiddleware } from './middleware/error.middleware.js';
import { apiRateLimiter } from './middleware/rate-limit.middleware.js';
import { requestLogger } from './middleware/logging.middleware.js';

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.appUrl, credentials: true }));
app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf.toString('utf8');
    }
  })
);
app.use(requestLogger);
app.use(apiRateLimiter);

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/api/auth', authRouter);
app.use('/api/instagram', instagramRouter);
app.use('/api/ai', aiRouter);
app.use('/api/razorpay', razorpayRouter);
app.use('/api/subscription', razorpayRouter);
app.use('/api/admin', adminRouter);

app.use(errorMiddleware);
