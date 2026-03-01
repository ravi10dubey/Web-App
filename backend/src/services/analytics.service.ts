export function calculateEngagementRate({ likes, comments, shares, reach }: { likes: number; comments: number; shares: number; reach: number }) {
  if (!reach) return 0;
  return ((likes + comments + shares) / reach) * 100;
}

export function calculateViralScore({ views, shares, saves, watchTime }: { views: number; shares: number; saves: number; watchTime: number }) {
  const weighted = views * 0.2 + shares * 0.35 + saves * 0.25 + watchTime * 0.2;
  return Number((weighted / 100).toFixed(2));
}
