"use client";

import { useState } from "react";
import { updateMessageStatus } from "@/app/admin/actions";
import { formatDistanceToNow } from "date-fns";

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  type: string;
  message: string;
  status: string;
  created_at: string;
};

export function ContactMessagesTable({ messages }: { messages: ContactMessage[] }) {
  const [optimisticMessages, setOptimisticMessages] = useState(messages);

  async function handleStatusChange(id: string, newStatus: string) {
    // Optimistic update
    setOptimisticMessages((current) =>
      current.map((msg) =>
        msg.id === id ? { ...msg, status: newStatus } : msg
      )
    );

    try {
      await updateMessageStatus(id, newStatus);
    } catch (error) {
      console.error(error);
      // Revert on error
      setOptimisticMessages(messages);
      alert("Failed to update message status.");
    }
  }

  if (optimisticMessages.length === 0) {
    return (
      <div className="p-8 text-center text-on-surface-variant font-body">
        No contact messages found.
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="border-b border-outline-variant/10 text-xs uppercase tracking-wider font-body text-on-surface-variant/70">
          <tr>
            <th className="px-6 py-4 font-medium">Name</th>
            <th className="px-6 py-4 font-medium">Email</th>
            <th className="px-6 py-4 font-medium">Type</th>
            <th className="px-6 py-4 font-medium">Message</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium text-right">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/10 font-body text-sm text-on-surface">
          {optimisticMessages.map((msg) => (
            <tr key={msg.id} className="hover:bg-surface-container-low/50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">{msg.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-on-surface-variant">{msg.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2.5 py-1 bg-surface-container-highest rounded-full text-xs font-medium">
                  {msg.type}
                </span>
              </td>
              <td className="px-6 py-4 max-w-xs truncate text-on-surface-variant">
                {msg.message || "—"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={msg.status}
                  onChange={(e) => handleStatusChange(msg.id, e.target.value)}
                  className={`bg-transparent text-sm font-medium focus:outline-none cursor-pointer ${
                    msg.status === "Unread"
                      ? "text-[#FF453A]"
                      : msg.status === "Responded"
                      ? "text-[#32D74B]"
                      : "text-on-surface-variant"
                  }`}
                >
                  <option value="Unread" className="bg-surface-container-low text-on-surface">Unread</option>
                  <option value="Read" className="bg-surface-container-low text-on-surface">Read</option>
                  <option value="Responded" className="bg-surface-container-low text-on-surface">Responded</option>
                  <option value="Archived" className="bg-surface-container-low text-on-surface">Archived</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-on-surface-variant text-xs">
                {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
