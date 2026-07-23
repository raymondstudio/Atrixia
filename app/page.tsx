import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Zap, Image as ImageIcon, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      {/* Background Gradient Orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/20 blur-[128px]" />
        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-accent/20 blur-[128px]" />
      </div>

      {/* Navigation Header */}
      <header className="relative z-10 mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-purple-500/30">
            <Sparkles className="h-5 w-5 text-foreground" />
          </div>
          <span className="font-sans text-xl font-bold tracking-tight text-foreground">
            Atrixia
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="default" size="sm">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pt-20 pb-16 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5" /> Built for Gemma 4 Hackathon
        </div>
        <h1 className="mb-6 font-sans text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
          Shop Smarter. <br />
          <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-cyan-400 bg-clip-text text-transparent">
            Decide Faster.
          </span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Atrixia researches products across multiple marketplaces and delivers one personalized recommendation backed by transparent AI reasoning.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/register">
            <Button variant="glow" size="lg" className="w-full sm:w-auto">
              Start Shopping <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              View Interactive Demo
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Why Choose Atrixia?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Stop switching tabs. Let AI evaluate seller trust, review sentiment, and delivery metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="glass-card rounded-2xl p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold">AI Decision Engine</h3>
            <p className="text-sm text-muted-foreground">
              Not just search results. Receive a complete Decision Report with clear pros, cons, and confidence scores.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-accent">
              <ImageIcon className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Multimodal Image Search</h3>
            <p className="text-sm text-muted-foreground">
              Upload a screenshot or photo. AI identifies the product, brand, and category automatically.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Buy with Confidence</h3>
            <p className="text-sm text-muted-foreground">
              Transparent trade-off analysis comparing pricing against shipping speed and seller reliability.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Timeline */}
      <section className="relative z-10 border-t border-border/50 bg-black/40 py-20 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-3 text-muted-foreground">
              Three simple steps to confident purchasing decisions
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/40 bg-primary/10 text-xl font-bold text-primary">
                1
              </div>
              <h3 className="mb-2 text-lg font-bold">Ask or Upload</h3>
              <p className="text-sm text-muted-foreground">
                Describe what you need in plain English or upload a product photo.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/40 bg-primary/10 text-xl font-bold text-primary">
                2
              </div>
              <h3 className="mb-2 text-lg font-bold">AI Researches</h3>
              <p className="text-sm text-muted-foreground">
                Atrixia queries marketplaces, parses customer reviews, and checks seller trust ratings.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/40 bg-primary/10 text-xl font-bold text-primary">
                3
              </div>
              <h3 className="mb-2 text-lg font-bold">Get Your Report</h3>
              <p className="text-sm text-muted-foreground">
                Receive one top recommendation with trade-offs and buy directly from the store.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-20 text-center">
        <div className="glass-panel rounded-3xl p-12">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Find Your Next Purchase?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
            Join Atrixia today and experience AI-powered shopping decision intelligence.
          </p>
          <Link href="/register">
            <Button variant="glow" size="lg">
              Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 bg-[#09090b] py-8 text-center text-xs text-muted-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <p>© 2026 Atrixia Inc. Built for Gemma 4 Hackathon.</p>
          <div className="flex items-center gap-6">
            <Link href="https://github.com/raymondstudio/Atrixia" target="_blank" className="hover:text-foreground">
              GitHub
            </Link>
            <Link href="/privacy" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
