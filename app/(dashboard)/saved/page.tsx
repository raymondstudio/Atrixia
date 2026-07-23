import Link from "next/link";
import { Bookmark, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { createClient } from "@/lib/supabase/server";

export default async function SavedPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("auth_user_id", user?.id || "")
    .single();

  const { data: savedItems } = await supabase
    .from("saved_items")
    .select("id, recommendation_id, created_at")
    .eq("profile_id", profile?.id || "");

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Saved Recommendations</h1>
        <p className="text-muted-foreground">
          Your bookmarked AI decision reports and top recommended picks
        </p>
      </div>

      {/* Grid or Empty State */}
      {!savedItems || savedItems.length === 0 ? (
        <EmptyState
          icon={<Bookmark className="h-7 w-7" />}
          title="You haven't saved any recommendations"
          description="Bookmark your favorite AI decision reports to quickly reference them later."
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {savedItems.map((item) => (
            <Card key={item.id} className="glass-card">
              <CardHeader>
                <CardTitle className="text-base font-bold">Saved Recommendation</CardTitle>
                <CardDescription>
                  Bookmarked on {new Date(item.created_at).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={`/recommendations/${item.recommendation_id}`}>
                  <div className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                    Open Decision Report <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
