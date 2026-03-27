"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase"; // Uses service role key
import { createClient } from "@/lib/supabase/server";

export async function inviteStaff(email: string, role: string) {
  // 1. Verify caller is a super-admin
  const authClient = await createClient();
  const { data: { user } } = await authClient.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { data: profile } = await authClient
    .from("staff_profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "super-admin") {
    return { error: "Unauthorized: Only super-admins can invite staff" };
  }

  // 2. Send invite via Supabase admin API
  const { data: inviteData, error: inviteError } = await supabase.auth.admin.inviteUserByEmail(email);

  if (inviteError) {
    return { error: `Failed to invite user: ${inviteError.message}` };
  }

  const newUserId = inviteData.user.id;

  // 3. Insert into staff_profiles
  const { error: profileError } = await authClient
    .from("staff_profiles")
    .insert({
      id: newUserId,
      email,
      role,
    });

  if (profileError) {
    // If inserting fails, we might want to clean up the auth user, but for now just return error
    return { error: `User invited, but profile creation failed: ${profileError.message}` };
  }

  revalidatePath("/admin");
  return { success: true };
}

export async function deleteStaff(id: string) {
  // 1. Verify caller is a super-admin
  const authClient = await createClient();
  const { data: { user } } = await authClient.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { data: profile } = await authClient
    .from("staff_profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "super-admin") {
    return { error: "Unauthorized: Only super-admins can delete staff" };
  }

  if (user.id === id) {
    return { error: "Cannot delete yourself" };
  }

  // 2. Delete user from auth (cascades to staff_profiles)
  const { error } = await supabase.auth.admin.deleteUser(id);

  if (error) {
    return { error: `Failed to delete staff: ${error.message}` };
  }

  revalidatePath("/admin");
  return { success: true };
}
