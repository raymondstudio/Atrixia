"use client";

import { useState } from "react";
import { Search, Sparkles, Image as ImageIcon, ArrowRight, ShieldCheck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [step, setStep] = useState<number>(0);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query) return;

    setIsSearching(true);
    setStep(1);

    // Simulate multi-step reasoning steps for demo preview
    setTimeout(() => setStep(2), 1000);
    setTimeout(() => setStep(3), 2000);
    setTimeout(() => setStep(4), 3000);
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">AI Product Search</h1>
        <p className="text-muted-foreground">
          Query multiple marketplaces and receive transparent AI reasoning
        </p>
      </div>

      {/* Input Form */}
      <Card className="border-border/80 bg-black/60 shadow-xl backdrop-blur-xl">
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-primary" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Describe what you are looking for... (e.g. Ergonomic chair under $200)"
                className="flex h-14 w-full rounded-xl border border-border bg-black/40 pl-12 pr-32 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button type="submit" isLoading={isSearching} className="absolute right-2 h-10 px-5">
                Analyze <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Progressive AI Reasoning & Results Stream */}
      {isSearching && (
        <div className="space-y-6">
          {/* Progressive Reasoning Tracker */}
          <Card className="glass-card border-primary/30">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Sparkles className="h-4 w-4 text-primary animate-pulse" /> AI Reasoning Pipeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                {step >= 1 ? <Check className="h-4 w-4 text-emerald-400" /> : <div className="h-4 w-4 rounded-full border border-border" />}
                <span className={step >= 1 ? "text-foreground font-medium" : "text-muted-foreground"}>
                  1. Deconstructing query intent and specs...
                </span>
              </div>
              <div className="flex items-center gap-2">
                {step >= 2 ? <Check className="h-4 w-4 text-emerald-400" /> : <div className="h-4 w-4 rounded-full border border-border" />}
                <span className={step >= 2 ? "text-foreground font-medium" : "text-muted-foreground"}>
                  2. Querying Amazon, eBay, and Jumia marketplace adapters...
                </span>
              </div>
              <div className="flex items-center gap-2">
                {step >= 3 ? <Check className="h-4 w-4 text-emerald-400" /> : <div className="h-4 w-4 rounded-full border border-border" />}
                <span className={step >= 3 ? "text-foreground font-medium" : "text-muted-foreground"}>
                  3. Deduplicating candidate listings & analyzing customer review sentiment...
                </span>
              </div>
              <div className="flex items-center gap-2">
                {step >= 4 ? <Check className="h-4 w-4 text-emerald-400" /> : <div className="h-4 w-4 rounded-full border border-border" />}
                <span className={step >= 4 ? "text-foreground font-medium" : "text-muted-foreground"}>
                  4. Compiling Decision Report...
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Skeletons while step < 4 */}
          {step < 4 && (
            <div className="space-y-4">
              <Skeleton className="h-48 w-full rounded-2xl" />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Skeleton className="h-32 w-full rounded-xl" />
                <Skeleton className="h-32 w-full rounded-xl" />
              </div>
            </div>
          )}

          {/* Final Decision Preview when step === 4 */}
          {step === 4 && (
            <Card className="glass-panel border-emerald-500/40 bg-emerald-500/5">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="success">AI Recommended Pick</Badge>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                    <ShieldCheck className="h-4 w-4" /> 94% Confidence Score
                  </div>
                </div>
                <CardTitle className="text-xl font-bold mt-2">
                  Recommended: Ergonomic Lumbar Mesh Desk Chair
                </CardTitle>
                <CardDescription>
                  Best overall balance of lumbar support, price ($149.99), and verified 2-day shipping.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Key Pros:</h4>
                  <ul className="list-disc pl-5 text-muted-foreground space-y-1 text-xs">
                    <li>3D Adjustable armrests with breathable mesh back</li>
                    <li>Verified seller with 98% positive rating across 450+ orders</li>
                  </ul>
                </div>
                <div className="flex items-center justify-between border-t border-border/50 pt-4">
                  <span className="text-lg font-bold text-foreground">$149.99</span>
                  <Button variant="glow" size="sm">
                    View Complete Decision Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
