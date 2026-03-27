"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export async function updateLeadStatus(id: string, status: string) {
  const { error } = await supabase
    .from("leads")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to update lead status: ${error.message}`);
  }

  revalidatePath("/admin");
}

export async function updateMessageStatus(id: string, status: string) {
  const { error } = await supabase
    .from("contact_messages")
    .update({ status })
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to update message status: ${error.message}`);
  }

  revalidatePath("/admin");
}
