import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHORIZED", message: "Authentication required." } },
      { status: 401 }
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("auth_user_id", user.id)
    .single();

  const { data: history, count } = await supabase
    .from("search_history")
    .select("id, query, created_at, search_session_id", { count: "exact" })
    .eq("profile_id", profile?.id || "")
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  return NextResponse.json({
    success: true,
    data: {
      items: history || [],
      total: count || 0,
      page,
      limit,
    },
  });
}
