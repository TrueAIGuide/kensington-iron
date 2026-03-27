"use client";

import { useState } from "react";
import { Button } from "@/components/ui";

export function CheckoutButton({
  priceId,
  planName,
  variant,
  className,
}: {
  priceId: string;
  planName: string;
  variant: 'primary' | 'secondary' | 'tertiary';
  className?: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId, planName }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("No checkout URL returned", data);
        alert("Failed to initiate checkout. Please try again.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      className={className}
      onClick={handleCheckout}
      disabled={loading}
    >
      {loading ? "PROCESSING..." : "SELECT"}
    </Button>
  );
}
