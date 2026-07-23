import { createClient } from "@/lib/supabase/server";
import { updatePreferencesAction } from "@/app/actions/user";
import { DollarSign, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default async function PreferencesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("auth_user_id", user?.id || "")
    .single();

  const profileData = profile as { id: string } | null;

  const { data: rawPrefs } = await supabase
    .from("preferences")
    .select("*")
    .eq("profile_id", profileData?.id || "")
    .single();

  const prefs = rawPrefs as {
    currency?: string;
    budget_min?: number;
    budget_max?: number;
    prioritize_price?: boolean;
    prioritize_quality?: boolean;
    prioritize_shipping?: boolean;
    prioritize_seller?: boolean;
  } | null;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Shopping Preferences</h1>
        <p className="text-muted-foreground">
          Configure how AI balances pricing, shipping, ratings, and seller trust
        </p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Decision Weight Priorities</CardTitle>
          <CardDescription>Select which metrics the AI engine should prioritize</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={async (formData: FormData) => { "use server"; await updatePreferencesAction(formData); }} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Preferred Currency</label>
              <select
                name="currency"
                defaultValue={prefs?.currency || "USD"}
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
                <label className="text-xs font-medium text-muted-foreground">Min Budget Filter</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input name="budgetMin" type="number" defaultValue={prefs?.budget_min || 0} className="pl-9" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Max Budget Filter</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input name="budgetMax" type="number" defaultValue={prefs?.budget_max || 1000} className="pl-9" />
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-border/50">
              <label className="text-xs font-medium text-muted-foreground">Decision Factors</label>

              <label className="flex items-center justify-between rounded-lg border border-border bg-black/30 p-3 cursor-pointer hover:bg-white/5">
                <span className="text-sm font-medium">Prioritize Lowest Price</span>
                <input type="checkbox" name="prioritizePrice" value="true" defaultChecked={prefs?.prioritize_price ?? true} className="h-4 w-4 rounded border-border text-primary focus:ring-primary" />
              </label>

              <label className="flex items-center justify-between rounded-lg border border-border bg-black/30 p-3 cursor-pointer hover:bg-white/5">
                <span className="text-sm font-medium">Prioritize Verified Product Quality</span>
                <input type="checkbox" name="prioritizeQuality" value="true" defaultChecked={prefs?.prioritize_quality ?? false} className="h-4 w-4 rounded border-border text-primary focus:ring-primary" />
              </label>

              <label className="flex items-center justify-between rounded-lg border border-border bg-black/30 p-3 cursor-pointer hover:bg-white/5">
                <span className="text-sm font-medium">Prioritize Fast Shipping</span>
                <input type="checkbox" name="prioritizeShipping" value="true" defaultChecked={prefs?.prioritize_shipping ?? false} className="h-4 w-4 rounded border-border text-primary focus:ring-primary" />
              </label>

              <label className="flex items-center justify-between rounded-lg border border-border bg-black/30 p-3 cursor-pointer hover:bg-white/5">
                <span className="text-sm font-medium">Prioritize Trusted Sellers Only</span>
                <input type="checkbox" name="prioritizeSeller" value="true" defaultChecked={prefs?.prioritize_seller ?? false} className="h-4 w-4 rounded border-border text-primary focus:ring-primary" />
              </label>
            </div>

            <Button type="submit" variant="glow">
              <Check className="mr-2 h-4 w-4" /> Save Preferences
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
