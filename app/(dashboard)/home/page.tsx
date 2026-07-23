import Link from "next/link";
import { Search, Sparkles, Image as ImageIcon, ArrowRight, Laptop, Headphones, Armchair, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

const suggestedPrompts = [
  { label: "Best programming laptop under $800", icon: Laptop },
  { label: "Wireless noise-canceling headphones", icon: Headphones },
  { label: "Ergonomic gaming chairs comparison", icon: Armchair },
  { label: "Top budget smartphone for photography", icon: Smartphone },
];

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: rawProfile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("auth_user_id", user?.id || "")
    .single();

  const profile = rawProfile as { full_name: string } | null;
  const firstName = profile?.full_name?.split(" ")[0] || "User";

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Greeting Banner */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5" /> AI Decision Agent Active
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Welcome back, {firstName}
        </h1>
        <p className="text-muted-foreground">
          What purchase can I research and evaluate for you today?
        </p>
      </div>

      {/* Main AI Search Box Card */}
      <Card className="border-border/80 bg-black/60 shadow-xl backdrop-blur-xl">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Ask Atrixia to find or compare products... (e.g. Best headphones under $150)"
                className="flex h-14 w-full rounded-xl border border-border bg-black/40 px-4 pr-12 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Link href="/search" className="absolute right-3 top-3">
                <Button size="icon" className="h-8 w-8">
                  <Search className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  <ImageIcon className="mr-1.5 h-3.5 w-3.5 text-accent" /> Upload Product Image
                </Button>
              </div>
              <span>Press Enter or click Search to begin AI analysis</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suggested Prompts */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Suggested Researches</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {suggestedPrompts.map((prompt) => {
            const Icon = prompt.icon;
            return (
              <Link key={prompt.label} href={`/search?q=${encodeURIComponent(prompt.label)}`}>
                <Card className="glass-card hover:border-primary/50 transition-colors">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">{prompt.label}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
