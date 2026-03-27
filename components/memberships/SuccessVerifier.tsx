"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyAndSaveStripeSession } from "@/app/memberships/actions";

export function SuccessVerifier() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const verified = useRef(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    const success = searchParams.get("success");
    
    if (success && sessionId && !verified.current) {
      verified.current = true;
      setIsVerifying(true);
      
      verifyAndSaveStripeSession(sessionId).then(() => {
        setIsVerifying(false);
        // Clear the URL parameters without a full reload
        router.replace("/memberships", { scroll: false });
      });
    }
  }, [searchParams, router]);

  if (!isVerifying) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-emerald-500/90 text-white font-sans text-sm py-2 px-4 shadow-lg flex items-center justify-center gap-3">
      <span className="material-symbols-outlined animate-spin text-lg">sync</span>
      <span>Finalizing your membership...</span>
    </div>
  );
}
