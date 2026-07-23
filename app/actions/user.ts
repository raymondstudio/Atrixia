"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProfileAction(formData: FormData) {
  const fullName = formData.get("fullName") as string;
  const avatarUrl = formData.get("avatarUrl") as string;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Authentication required." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      avatar_url: avatarUrl || null,
    })
    .eq("auth_user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/profile");
  return { success: "Profile updated successfully." };
}

export async function updatePreferencesAction(formData: FormData) {
  const currency = (formData.get("currency") as string) || "USD";
  const budgetMin = Number(formData.get("budgetMin")) || 0;
  const budgetMax = Number(formData.get("budgetMax")) || 1000;
  const prioritizePrice = formData.get("prioritizePrice") === "true";
  const prioritizeQuality = formData.get("prioritizeQuality") === "true";
  const prioritizeShipping = formData.get("prioritizeShipping") === "true";
  const prioritizeSeller = formData.get("prioritizeSeller") === "true";
  const prioritizeReviews = formData.get("prioritizeReviews") === "true";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Authentication required." };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("auth_user_id", user.id)
    .single();

  if (!profile) {
    return { error: "Profile not found." };
  }

  const { error } = await supabase
    .from("preferences")
    .update({
      currency,
      budget_min: budgetMin,
      budget_max: budgetMax,
      prioritize_price: prioritizePrice,
      prioritize_quality: prioritizeQuality,
      prioritize_shipping: prioritizeShipping,
      prioritize_seller: prioritizeSeller,
      prioritize_reviews: prioritizeReviews,
    })
    .eq("profile_id", profile.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/preferences");
  return { success: "Preferences updated successfully." };
}

export async function completeOnboardingAction(formData: FormData) {
  const res = await updatePreferencesAction(formData);
  if (res?.error) {
    return res;
  }
  redirect("/home");
}
