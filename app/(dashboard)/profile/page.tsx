import { createClient } from "@/lib/supabase/server";
import { updateProfileAction } from "@/app/actions/user";
import { User, Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: rawProfile } = await supabase
    .from("profiles")
    .select("full_name, email, avatar_url")
    .eq("auth_user_id", user?.id || "")
    .single();

  const profile = rawProfile as { full_name: string; email: string; avatar_url: string | null } | null;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Profile Overview</h1>
        <p className="text-muted-foreground">
          Manage your personal information and avatar settings
        </p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>User Details</CardTitle>
          <CardDescription>Update your display name and public account info</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={async (formData: FormData) => { "use server"; await updateProfileAction(formData); }} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  name="fullName"
                  type="text"
                  defaultValue={profile?.full_name || ""}
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Email Address (Read-only)</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  value={profile?.email || user?.email || ""}
                  className="pl-9 bg-black/20 text-muted-foreground cursor-not-allowed"
                  disabled
                />
              </div>
            </div>

            <Button type="submit" variant="default" className="mt-4">
              <Check className="mr-2 h-4 w-4" /> Save Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
