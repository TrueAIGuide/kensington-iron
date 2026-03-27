"use server";

import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export async function verifyAndSaveStripeSession(sessionId: string) {
  if (!process.env.STRIPE_SECRET_KEY) return { success: false };
  // @ts-ignore
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" });
  
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === "paid" || session.status === "complete") {
      const customerEmail = session.customer_details?.email;
      const customerName = session.customer_details?.name || "Unknown Member";
      const planTier = session.metadata?.planTier || "Unknown Plan";
      const customerId = session.customer as string;

      if (!customerEmail || !customerId) return { success: false };

      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );
      
      const { data: existing, error: selectError } = await supabase.from("members").select("id").eq("stripe_customer_id", customerId).single();
      
      if (selectError && selectError.code !== 'PGRST116') {
        console.error("Supabase select error:", selectError);
      }

      if (!existing) {
        const { error: insertError } = await supabase.from("members").insert({
          email: customerEmail,
          name: customerName,
          plan_tier: planTier,
          stripe_customer_id: customerId,
          subscription_status: "Active"
        });
        
        if (insertError) {
          console.error("Supabase insert error in Action:", insertError);
        } else {
          console.log("✅ Successfully inserted member into Supabase from Action");
        }
      }
      return { success: true };
    }
  } catch (error) {
    console.error("Session verification error:", error);
  }
  return { success: false };
}
