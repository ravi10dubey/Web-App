import { app } from './app.js';
import { authenticatePocketBaseAdmin } from './config/pocketbase.js';
import { env } from './config/env.js';
import { startDailyInstagramSync, startMonthlyCreditReset } from './jobs/daily-sync.job.js';

async function bootstrap() {
  await authenticatePocketBaseAdmin();
  startDailyInstagramSync();
  startMonthlyCreditReset();

  app.listen(env.port, () => {
    console.log(`API running on port ${env.port}`);
  });
}

bootstrap().catch((error) => {
  console.error('Failed to bootstrap server', error);
  process.exit(1);
});
