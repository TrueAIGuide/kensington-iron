"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function addClass(formData: FormData) {
  const supabase = await createClient();
  
  const title = formData.get("title") as string;
  const instructor = formData.get("instructor") as string;
  const startTime = formData.get("startTime") as string;
  const duration = parseInt(formData.get("duration") as string, 10);
  const capacity = parseInt(formData.get("capacity") as string, 10);

  const { error } = await supabase.from("classes").insert([{
    title,
    instructor,
    start_time: new Date(startTime).toISOString(),
    duration_minutes: duration,
    capacity,
    enrolled: 0,
    status: "Scheduled"
  }]);

  if (error) {
    throw new Error(`Failed to add class: ${error.message}`);
  }

  revalidatePath("/admin");
}

export async function updateClassStatus(id: string, status: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("classes")
    .update({ status })
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to update class: ${error.message}`);
  }

  revalidatePath("/admin");
}

export async function deleteClass(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("classes")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to delete class: ${error.message}`);
  }

  revalidatePath("/admin");
}
