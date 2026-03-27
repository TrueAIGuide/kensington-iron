"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function addCoach(formData: FormData) {
  const supabase = await createClient();
  
  const name = formData.get("name") as string;
  const specialty = formData.get("specialty") as string;
  const image = formData.get("image") as string;
  const className = formData.get("className") as string;
  const bio = formData.get("bio") as string;
  const orderIndex = parseInt(formData.get("orderIndex") as string, 10) || 99;

  const { error } = await supabase.from("coaches").insert([{
    name,
    specialty,
    image,
    class_name: className,
    bio,
    order_index: orderIndex,
  }]);

  if (error) {
    throw new Error(`Failed to add coach: ${error.message}`);
  }

  revalidatePath("/admin");
  revalidatePath("/coaches");
}

export async function updateCoach(id: string, formData: FormData) {
  const supabase = await createClient();
  
  const name = formData.get("name") as string;
  const specialty = formData.get("specialty") as string;
  const image = formData.get("image") as string;
  const className = formData.get("className") as string;
  const bio = formData.get("bio") as string;
  const orderIndexStr = formData.get("orderIndex") as string;

  const updates: any = {
    name,
    specialty,
    image,
    class_name: className,
    bio,
    updated_at: new Date().toISOString(),
  };

  if (orderIndexStr) {
    const parsed = parseInt(orderIndexStr, 10);
    if (!isNaN(parsed)) updates.order_index = parsed;
  }

  const { error } = await supabase
    .from("coaches")
    .update(updates)
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to update coach: ${error.message}`);
  }

  revalidatePath("/admin");
  revalidatePath("/coaches");
}

export async function deleteCoach(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("coaches")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to delete coach: ${error.message}`);
  }

  revalidatePath("/admin");
  revalidatePath("/coaches");
}
