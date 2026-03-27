"use server";

import { createClient } from "@supabase/supabase-js";

export async function submitContactMessage(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const type = formData.get("type") as string;
    const message = formData.get("message") as string;

    // Use a standard non-authenticated client since we enabled "anon" inserts on the RLS
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.from("contact_messages").insert([{
      name,
      email,
      type,
      message,
    }]);

    if (error) {
      console.error("Supabase insert error:", error);
      return { success: false, error: "Database error" };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Action error:", error);
    return { success: false, error: error?.message || "Internal error" };
  }
}
