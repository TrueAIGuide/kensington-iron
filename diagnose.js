const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: ".env.local" });

async function testInsert() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  console.log("Attempting insert...");
  const { data, error } = await supabase.from("members").insert({
    email: "test_debug@kensington.local",
    name: "Debug Test",
    plan_tier: "Essential",
    stripe_customer_id: "cus_debug_123",
    subscription_status: "Active"
  });

  if (error) {
    console.error("DIAGNOSTIC ERROR REPORT:");
    console.error(error);
  } else {
    console.log("DIAGNOSTIC SUCCESS! Member inserted:", data);
  }
}

testInsert();
