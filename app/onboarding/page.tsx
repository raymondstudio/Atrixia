"use client";

import { useState } from "react";
import { Sparkles, DollarSign, Sliders, CheckCircle2, ArrowRight } from "lucide-react";
import { completeOnboardingAction } from "@/app/actions/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const res = await completeOnboardingAction(formData);
    if (res?.error) {
      setError(res.error);
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-xl border-border/80 bg-black/60 shadow-2xl backdrop-blur-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-purple-500/30">
            <Sparkles className="h-6 w-6 text-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Personalize Your AI Agent</CardTitle>
          <CardDescription>Configure your default shopping criteria (Step {step} of 2)</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} id="onboarding-form" className="space-y-6">
            {error && (
              <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
                {error}
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">Preferred Currency</label>
                  <select
                    name="currency"
                    defaultValue="USD"
                    className="flex h-10 w-full rounded-lg border border-border bg-black/40 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="NGN">NGN (₦)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Default Min Budget</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input name="budgetMin" type="number" defaultValue="0" className="pl-9" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Default Max Budget</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input name="budgetMax" type="number" defaultValue="500" className="pl-9" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <label className="text-xs font-medium text-muted-foreground">Decision Priority Factors</label>

                  <label className="flex items-center justify-between rounded-lg border border-border bg-black/30 p-3 cursor-pointer hover:bg-white/5">
                    <span className="text-sm font-medium">Lowest Price Priority</span>
                    <input type="checkbox" name="prioritizePrice" value="true" defaultChecked className="h-4 w-4 rounded border-border text-primary focus:ring-primary" />
                  </label>

                  <label className="flex items-center justify-between rounded-lg border border-border bg-black/30 p-3 cursor-pointer hover:bg-white/5">
                    <span className="text-sm font-medium">Verified Product Quality</span>
                    <input type="checkbox" name="prioritizeQuality" value="true" defaultChecked className="h-4 w-4 rounded border-border text-primary focus:ring-primary" />
                  </label>

                  <label className="flex items-center justify-between rounded-lg border border-border bg-black/30 p-3 cursor-pointer hover:bg-white/5">
                    <span className="text-sm font-medium">Fast Shipping Speed</span>
                    <input type="checkbox" name="prioritizeShipping" value="true" className="h-4 w-4 rounded border-border text-primary focus:ring-primary" />
                  </label>

                  <label className="flex items-center justify-between rounded-lg border border-border bg-black/30 p-3 cursor-pointer hover:bg-white/5">
                    <span className="text-sm font-medium">High Seller Trust Score</span>
                    <input type="checkbox" name="prioritizeSeller" value="true" defaultChecked className="h-4 w-4 rounded border-border text-primary focus:ring-primary" />
                  </label>
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-border/50 pt-4">
          {step > 1 ? (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Previous
            </Button>
          ) : <div />}

          {step < 2 ? (
            <Button onClick={() => setStep(2)}>
              Next Step <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" form="onboarding-form" isLoading={loading}>
              Complete Setup <CheckCircle2 className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
