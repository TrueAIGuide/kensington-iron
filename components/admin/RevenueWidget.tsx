"use client";

import { useState, useMemo } from "react";

type Member = {
  id: string;
  plan_tier: string;
  created_at: string;
};

const TIER_PRICES: Record<string, number> = {
  essential: 250,
  premium: 450,
  exclusive: 850,
};

type Timeframe = "today" | "week" | "month" | "year" | "all";

export default function RevenueWidget({ members }: { members: Member[] }) {
  const [timeframe, setTimeframe] = useState<Timeframe>("month");

  const revenue = useMemo(() => {
    if (!members || members.length === 0) return 0;

    const now = new Date();
    
    // Set up boundaries
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const startOfWeek = new Date(startOfDay);
    startOfWeek.setDate(startOfWeek.getDate() - now.getDay()); // Sunday as start of week
    
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const filtered = members.filter((m) => {
      const createdAt = new Date(m.created_at);
      if (isNaN(createdAt.getTime())) return false; // fast invalid check

      switch (timeframe) {
        case "today":
          return createdAt >= startOfDay;
        case "week":
          return createdAt >= startOfWeek;
        case "month":
          return createdAt >= startOfMonth;
        case "year":
          return createdAt >= startOfYear;
        case "all":
        default:
          return true;
      }
    });

    return filtered.reduce((total, m) => {
      const tier = (m.plan_tier || "").toLowerCase();
      return total + (TIER_PRICES[tier] || 0);
    }, 0);
  }, [members, timeframe]);

  const tabs: { id: Timeframe; label: string }[] = [
    { id: "today", label: "Today" },
    { id: "week", label: "This Week" },
    { id: "month", label: "This Month" },
    { id: "year", label: "This Year" },
    { id: "all", label: "All Time" },
  ];

  return (
    <div className="rounded-xl bg-surface-container-lowest border border-outline-variant/10 p-6 flex flex-col h-full transition-all duration-300 hover:border-outline-variant/25">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/10 pb-5 mb-5">
        <div>
          <h3 className="font-serif text-lg tracking-tight">Revenue Generator</h3>
          <p className="font-sans text-xs text-on-surface-variant/60 mt-0.5">
            Total membership revenue tracked by signups.
          </p>
        </div>
        
        {/* Segmented Control */}
        <div className="flex bg-surface-container-high rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTimeframe(tab.id)}
              className={`
                px-3 py-1.5 text-xs font-sans font-medium rounded-md transition-all duration-200
                ${timeframe === tab.id 
                  ? "bg-surface text-on-surface shadow-sm" 
                  : "text-on-surface-variant/70 hover:text-on-surface"}
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center py-4">
        <p className="font-sans text-xs uppercase tracking-[0.1em] text-on-surface-variant/60 mb-2">Total Revenue Tracked</p>
        <div className="flex items-baseline gap-2">
          <p className="font-serif text-5xl tracking-tight text-on-surface">
            £{revenue.toLocaleString()}
          </p>
          <span className="font-sans text-sm text-on-surface-variant/60">
            {timeframe === "month" ? "this month" : timeframe === "week" ? "this week" : timeframe === "today" ? "today" : timeframe === "year" ? "this year" : "all time"}
          </span>
        </div>
      </div>
    </div>
  );
}
