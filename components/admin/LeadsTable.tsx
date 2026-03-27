"use client";

import { useTransition, useOptimistic } from "react";
import { updateLeadStatus } from "@/app/admin/actions";
import type { Lead } from "@/lib/supabase";

const STATUS_OPTIONS = ["New", "Contacted", "Qualified", "Converted", "Lost"];

const STATUS_COLORS: Record<string, string> = {
  New: "bg-blue-500/20 text-blue-300",
  Contacted: "bg-amber-500/20 text-amber-300",
  Qualified: "bg-emerald-500/20 text-emerald-300",
  Converted: "bg-primary/20 text-primary",
  Lost: "bg-red-500/20 text-red-300",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  const [isPending, startTransition] = useTransition();
  const [optimisticLeads, setOptimisticLeads] = useOptimistic(leads);

  function handleStatusChange(id: string, newStatus: string) {
    // Optimistic update
    setOptimisticLeads((prev) =>
      prev.map((lead) =>
        lead.id === id ? { ...lead, status: newStatus } : lead
      )
    );

    startTransition(async () => {
      await updateLeadStatus(id, newStatus);
    });
  }

  if (optimisticLeads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-on-surface-variant">
        <span className="material-symbols-outlined text-5xl mb-4 opacity-40">
          person_add
        </span>
        <p className="font-sans text-lg">No leads yet</p>
        <p className="font-sans text-sm opacity-60 mt-1">
          Leads will appear here when they are added to the system.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-outline-variant/15 text-on-surface-variant text-xs uppercase tracking-[0.1em] font-sans">
            <th className="py-4 px-4 font-medium">Name</th>
            <th className="py-4 px-4 font-medium">Email</th>
            <th className="py-4 px-4 font-medium">Phone</th>
            <th className="py-4 px-4 font-medium">Status</th>
            <th className="py-4 px-4 font-medium">Created</th>
          </tr>
        </thead>
        <tbody>
          {optimisticLeads.map((lead) => (
            <tr
              key={lead.id}
              className="border-b border-outline-variant/10 hover:bg-surface-container-low/50 transition-colors duration-200"
            >
              <td className="py-4 px-4 font-sans text-on-surface">
                {lead.name}
              </td>
              <td className="py-4 px-4 font-sans text-on-surface-variant text-sm">
                {lead.email}
              </td>
              <td className="py-4 px-4 font-sans text-on-surface-variant text-sm">
                {lead.phone_number || "—"}
              </td>
              <td className="py-4 px-4">
                <select
                  value={lead.status}
                  onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                  disabled={isPending}
                  className={`
                    appearance-none cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium font-sans
                    border-none outline-none transition-all duration-200
                    ${STATUS_COLORS[lead.status] || "bg-surface-container-high text-on-surface"}
                    disabled:opacity-50 disabled:cursor-wait
                    focus:ring-1 focus:ring-primary/50
                  `}
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option
                      key={opt}
                      value={opt}
                      className="bg-surface-container-highest text-on-surface"
                    >
                      {opt}
                    </option>
                  ))}
                </select>
              </td>
              <td className="py-4 px-4 font-sans text-on-surface-variant text-sm">
                {formatDate(lead.created_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-xs text-on-surface-variant/60 font-sans px-4 pb-2">
        Showing {optimisticLeads.length}{" "}
        {optimisticLeads.length === 1 ? "lead" : "leads"}
      </div>
    </div>
  );
}
