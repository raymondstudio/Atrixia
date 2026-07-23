"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProfileAction(formData: FormData): Promise<{ error?: string; success?: string }> {
  const fullName = formData.get("fullName") as string;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Authentication required." };
  }

  const { error } = await (supabase as any)
    .from("profiles")
    .update({
      full_name: fullName,
    })
    .eq("auth_user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/profile");
  return { success: "Profile updated successfully." };
}

export async function updatePreferencesAction(formData: FormData): Promise<{ error?: string; success?: string }> {
  const currency = (formData.get("currency") as string) || "USD";
  const budgetMin = Number(formData.get("budgetMin")) || 0;
  const budgetMax = Number(formData.get("budgetMax")) || 1000;
  const prioritizePrice = formData.get("prioritizePrice") === "true";
  const prioritizeQuality = formData.get("prioritizeQuality") === "true";
  const prioritizeShipping = formData.get("prioritizeShipping") === "true";
  const prioritizeSeller = formData.get("prioritizeSeller") === "true";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Authentication required." };
  }

  const { data: profile } = await (supabase as any)
    .from("profiles")
    .select("id")
    .eq("auth_user_id", user.id)
    .single();

  const profileData = profile as { id: string } | null;

  if (!profileData) {
    return { error: "Profile not found." };
  }

  const { error } = await (supabase as any)
    .from("preferences")
    .update({
      currency,
      budget_min: budgetMin,
      budget_max: budgetMax,
      prioritize_price: prioritizePrice,
      prioritize_quality: prioritizeQuality,
      prioritize_shipping: prioritizeShipping,
      prioritize_seller: prioritizeSeller,
    })
    .eq("profile_id", profileData.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/preferences");
  return { success: "Preferences updated successfully." };
}

export async function completeOnboardingAction(formData: FormData): Promise<{ error?: string; success?: string }> {
  const res = await updatePreferencesAction(formData);
  if (res?.error) {
    return res;
  }
  return { success: "Onboarding completed successfully." };
}
