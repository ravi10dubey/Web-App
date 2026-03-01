import { Button } from '@/components/ui/button';

const features = [
  'Instagram Reels analytics with daily sync',
  'AI captions, hooks, hashtags, and viral score',
  'Best time to post + category insights',
  'Razorpay-powered plan management'
];

const faqs = [
  {
    q: 'Does this support TikTok?',
    a: 'No. InstaScale AI is intentionally Instagram-only for deep platform specialization.'
  },
  {
    q: 'Can agencies manage multiple brands?',
    a: 'Yes, the Agency plan supports multi-account workflows and team access controls.'
  }
];

export function LandingPage() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 py-24 text-center">
        <p className="mb-4 text-sm uppercase tracking-widest text-primary">Instagram Growth Intelligence</p>
        <h1 className="mb-6 text-4xl font-semibold md:text-6xl">Scale Instagram Reels with AI + Analytics</h1>
        <p className="mx-auto mb-8 max-w-2xl text-foreground/80">
          Connect Instagram Business, track reach/engagement, and generate high-converting content
          recommendations for creators, brands, and agencies.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg">Start Free</Button>
          <Button variant="outline" size="lg">
            View Demo
          </Button>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 pb-12 md:grid-cols-2">
        {features.map((feature) => (
          <div key={feature} className="rounded-lg border border-border bg-card p-6 shadow-sm">
            {feature}
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="mb-4 text-2xl font-semibold">Pricing</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {['Free', 'Pro', 'Agency'].map((plan) => (
            <article key={plan} className="rounded-lg border border-border p-6">
              <h3 className="mb-3 text-2xl font-semibold">{plan}</h3>
              <p className="mb-4 text-foreground/80">Instagram-focused analytics + AI workflows.</p>
              <Button className="w-full">Choose {plan}</Button>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="mb-4 text-2xl font-semibold">Testimonials</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <blockquote className="rounded-lg border border-border bg-card p-5">
            “Our reel engagement improved 2.3x in six weeks.” — Growth Manager
          </blockquote>
          <blockquote className="rounded-lg border border-border bg-card p-5">
            “Agency reporting became fully automated.” — Agency Founder
          </blockquote>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24">
        <h2 className="mb-4 text-2xl font-semibold">FAQ</h2>
        <div className="space-y-3">
          {faqs.map((item) => (
            <div key={item.q} className="rounded-lg border border-border p-4">
              <h3 className="font-medium">{item.q}</h3>
              <p className="text-foreground/80">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
