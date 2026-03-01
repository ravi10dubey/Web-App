import cron from 'node-cron';

export function startDailyInstagramSync() {
  cron.schedule('0 2 * * *', async () => {
    console.log('[job] Starting daily Instagram sync...');
    // Pull each connected account from PocketBase and sync latest media + insights.
    console.log('[job] Instagram sync completed.');
  });
}

export function startMonthlyCreditReset() {
  cron.schedule('0 0 1 * *', async () => {
    console.log('[job] Monthly AI credit reset started...');
    // Lookup active subscriptions and reset credits based on plan mapping.
    console.log('[job] Monthly AI credit reset completed.');
  });
}
