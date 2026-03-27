"use client";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getPlanPrice(tier: string) {
  const lowerTier = (tier || "").toLowerCase();
  if (lowerTier === "essential") return "£250/mo";
  if (lowerTier === "premium") return "£450/mo";
  if (lowerTier === "exclusive") return "£850/mo";
  return "—";
}

function getExpiryDate(iso: string) {
  const date = new Date(iso);
  date.setDate(date.getDate() + 30); // 30 days validity
  
  // Custom check to see if it's expired or close to expiring (within 3 days)
  const now = new Date();
  const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  
  if (diffDays <= 0) return { text: formattedDate, state: 'expired' };
  if (diffDays <= 3) return { text: formattedDate, state: 'warning' };
  return { text: formattedDate, state: 'valid' };
}

export default function MembersTable({ members }: { members: any[] }) {
  if (!members || members.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-on-surface-variant">
        <span className="material-symbols-outlined text-5xl mb-4 opacity-40">
          group
        </span>
        <p className="font-sans text-lg">No active members yet</p>
        <p className="font-sans text-sm opacity-60 mt-1">
          Members will appear here once they complete checkout.
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
            <th className="py-4 px-4 font-medium">Plan Tier</th>
            <th className="py-4 px-4 font-medium">Price</th>
            <th className="py-4 px-4 font-medium">Status</th>
            <th className="py-4 px-4 font-medium">Joined</th>
            <th className="py-4 px-4 font-medium">Expires On</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => {
            const expiry = getExpiryDate(member.created_at);
            return (
              <tr
                key={member.id}
                className="border-b border-outline-variant/10 hover:bg-surface-container-low/50 transition-colors duration-200"
              >
                <td className="py-4 px-4 font-sans text-on-surface">
                  {member.name}
                </td>
                <td className="py-4 px-4 font-sans text-on-surface-variant text-sm">
                  {member.email}
                </td>
                <td className="py-4 px-4 font-sans text-primary font-medium text-sm capitalize">
                  {member.plan_tier || "—"}
                </td>
                <td className="py-4 px-4 font-sans text-on-surface-variant text-sm">
                  {getPlanPrice(member.plan_tier)}
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-block rounded-md px-3 py-1.5 text-xs font-medium font-sans border-none outline-none ${
                      member.subscription_status === 'Active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-surface-container-high text-on-surface'
                  }`}>
                    {member.subscription_status}
                  </span>
                </td>
                <td className="py-4 px-4 font-sans text-on-surface-variant text-sm">
                  {formatDate(member.created_at)}
                </td>
                <td className="py-4 px-4 font-sans text-sm">
                  <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${
                    expiry.state === 'expired' ? 'bg-red-500/20 text-red-400' : 
                    expiry.state === 'warning' ? 'bg-amber-500/20 text-amber-400' : 
                    'text-on-surface-variant'
                  }`}>
                    {expiry.text}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-4 text-xs text-on-surface-variant/60 font-sans px-4 pb-2">
        Showing {members.length} {members.length === 1 ? "member" : "members"}
      </div>
    </div>
  );
}
