import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
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

  const { data: prefs } = await supabase
    .from("preferences")
    .select("*")
    .eq("profile_id", profile?.id || "")
    .single();

  return NextResponse.json({
    success: true,
    data: prefs || {},
  });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
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

    const { data: updatedPrefs, error } = await supabase
      .from("preferences")
      .update(body)
      .eq("profile_id", profile?.id || "")
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, error: { code: "UPDATE_FAILED", message: error.message } },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedPrefs,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "BAD_REQUEST", message: "Invalid payload." } },
      { status: 400 }
    );
  }
}
