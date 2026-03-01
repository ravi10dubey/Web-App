export function AdminPanel() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20">
      <h2 className="mb-4 text-2xl font-semibold">Admin Panel Preview</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {['Users', 'Subscriptions', 'Webhook Logs'].map((card) => (
          <div key={card} className="rounded-lg border border-border bg-card p-5">
            <p className="text-sm text-foreground/70">{card}</p>
            <p className="text-xl font-semibold">Manage</p>
          </div>
        ))}
      </div>
    </section>
  );
}
