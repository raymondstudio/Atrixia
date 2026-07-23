import Link from "next/link";
import { History as HistoryIcon, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { createClient } from "@/lib/supabase/server";

export default async function HistoryPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("auth_user_id", user?.id || "")
    .single();

  const { data: history } = await supabase
    .from("search_history")
    .select("id, query, created_at, search_session_id")
    .eq("profile_id", profile?.id || "")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Search History</h1>
        <p className="text-muted-foreground">
          Replay previous product research and decision reports
        </p>
      </div>

      {/* List or Empty State */}
      {!history || history.length === 0 ? (
        <EmptyState
          icon={<HistoryIcon className="h-7 w-7" />}
          title="No previous searches yet"
          description="Your natural language searches and image uploads will be saved here for easy access."
        />
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <Card key={item.id} className="glass-card hover:border-primary/50 transition-colors">
              <CardContent className="flex items-center justify-between p-4">
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">{item.query}</p>
                  <p className="text-xs text-muted-foreground">
                    Searched on {new Date(item.created_at).toLocaleDateString()}
                  </p>
                </div>
                <Link href={`/search?session=${item.search_session_id}`}>
                  <div className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                    View Decision <ArrowRight className="h-3.5 w-3.5" />
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
