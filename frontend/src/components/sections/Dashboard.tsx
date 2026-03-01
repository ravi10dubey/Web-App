import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar
} from 'recharts';

const growthData = [
  { day: 'Mon', engagement: 5.2, followers: 2100 },
  { day: 'Tue', engagement: 6.3, followers: 2172 },
  { day: 'Wed', engagement: 7.0, followers: 2288 },
  { day: 'Thu', engagement: 8.4, followers: 2412 },
  { day: 'Fri', engagement: 7.8, followers: 2524 }
];

const reels = [
  { name: 'Launch Reel', views: 12000 },
  { name: 'Behind the scenes', views: 9400 },
  { name: 'Case study', views: 15400 }
];

export function Dashboard() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16">
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {[
          ['Total Reels', '24'],
          ['Engagement Rate', '7.8%'],
          ['Followers Growth', '+14.2%']
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border border-border bg-card p-5">
            <p className="text-sm text-foreground/70">{label}</p>
            <p className="text-2xl font-semibold">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="h-72 rounded-lg border border-border p-4">
          <h3 className="mb-3 font-medium">Engagement Over Time</h3>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="engagement" stroke="#7C3AED" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="h-72 rounded-lg border border-border p-4">
          <h3 className="mb-3 font-medium">Reels Performance</h3>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={reels}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="views" fill="#7C3AED" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
