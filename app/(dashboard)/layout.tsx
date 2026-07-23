import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/layout/sidebar";
import { TopNav } from "@/components/layout/top-nav";
import { BottomNav } from "@/components/layout/bottom-nav";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Prefetch profile info for top nav bar
  const { data: rawProfile } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("auth_user_id", user.id)
    .single();

  const profile = rawProfile as { full_name: string; email: string } | null;

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-x-hidden pb-16 md:pb-0">
        {/* Top Header */}
        <TopNav
          userEmail={profile?.email || user.email || "user@example.com"}
          fullName={profile?.full_name || "User"}
        />

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
