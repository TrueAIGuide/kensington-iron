"use client";

import { useState, useTransition } from "react";
import { inviteStaff, deleteStaff } from "@/app/admin/staff-actions";

type StaffProfile = {
  id: string;
  email: string;
  role: string;
  created_at: string;
};

export default function ManageStaff({ initialStaff }: { initialStaff: StaffProfile[] }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function handleInvite(formData: FormData) {
    setError(null);
    setSuccess(null);
    const email = formData.get("email") as string;
    const role = formData.get("role") as string;

    startTransition(async () => {
      const result = await inviteStaff(email, role);
      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess(`Invited ${email} as ${role}`);
      }
    });
  }

  function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this staff member?")) return;
    
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      const result = await deleteStaff(id);
      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess("Staff member deleted");
      }
    });
  }

  return (
    <div className="space-y-8">
      {/* Invite Form */}
      <section className="rounded-xl bg-surface-container-lowest border border-outline-variant/10 p-6">
        <h3 className="font-serif text-lg tracking-tight mb-1">Invite New Staff</h3>
        <p className="font-sans text-xs text-on-surface-variant/60 mb-6">
          Send an email invitation to add a new admin or staff member.
        </p>

        <form action={handleInvite} className="flex flex-col sm:flex-row items-end gap-4">
          <div className="flex-1 w-full">
            <label htmlFor="email" className="block font-sans text-[0.65rem] uppercase tracking-[0.1em] text-on-surface-variant/60 mb-2">
              Email Address
            </label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              required
              disabled={isPending}
              className="w-full bg-transparent border-b border-outline text-on-surface font-sans py-2 outline-none transition-all focus:border-primary disabled:opacity-50 text-sm"
              placeholder="colleague@kensingtonfe.com"
            />
          </div>
          
          <div className="w-full sm:w-48">
            <label htmlFor="role" className="block font-sans text-[0.65rem] uppercase tracking-[0.1em] text-on-surface-variant/60 mb-2">
              Role
            </label>
            <select 
              id="role" 
              name="role"
              disabled={isPending}
              className="w-full bg-surface-container-high border border-outline-variant/15 text-on-surface rounded-md px-3 py-2 text-sm font-sans outline-none focus:border-primary appearance-none cursor-pointer"
            >
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
              <option value="super-admin">Super Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto bg-gradient-primary text-on-primary px-6 py-2.5 rounded-sm font-sans text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isPending ? "Inviting..." : "Send Invite"}
          </button>
        </form>

        {error && <p className="mt-4 text-xs font-sans text-red-400">{error}</p>}
        {success && <p className="mt-4 text-xs font-sans text-emerald-400">{success}</p>}
      </section>

      {/* Staff List */}
      <section className="rounded-xl bg-surface-container-lowest border border-outline-variant/10 overflow-hidden">
        <div className="px-6 py-5 border-b border-outline-variant/10">
          <h3 className="font-serif text-lg tracking-tight">Current Staff</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant/15 text-on-surface-variant text-xs uppercase tracking-[0.1em] font-sans">
                <th className="py-4 px-6 font-medium">Email</th>
                <th className="py-4 px-6 font-medium">Role</th>
                <th className="py-4 px-6 font-medium">Joined</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {initialStaff.map((staff) => (
                <tr key={staff.id} className="border-b border-outline-variant/10 hover:bg-surface-container-low/50 transition-colors duration-200">
                  <td className="py-4 px-6 font-sans text-on-surface text-sm">{staff.email}</td>
                  <td className="py-4 px-6 font-sans text-sm">
                    <span className={`px-2 py-1 rounded border text-[0.65rem] uppercase tracking-wider ${
                      staff.role === 'super-admin' 
                        ? 'bg-primary/10 border-primary/20 text-primary' 
                        : staff.role === 'admin'
                          ? 'bg-blue-500/10 border-blue-500/20 text-blue-300'
                          : 'bg-surface-container-high border-outline-variant/30 text-on-surface-variant'
                    }`}>
                      {staff.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-sans text-on-surface-variant text-sm">
                    {new Date(staff.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleDelete(staff.id)}
                      disabled={isPending}
                      className="text-red-400/70 hover:text-red-400 transition-colors p-1"
                      title="Remove Staff"
                    >
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
