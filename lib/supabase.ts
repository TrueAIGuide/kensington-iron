import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * Server-side Supabase client using the service role key.
 * This bypasses RLS — use only in API routes and server actions.
 */
export const supabase = createClient(supabaseUrl, supabaseServiceKey);

/** Lead row type matching the `public.leads` table */
export type Lead = {
  id: string;
  name: string;
  email: string;
  phone_number: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};
