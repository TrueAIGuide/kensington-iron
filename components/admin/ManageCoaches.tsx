"use client";

import { useState } from "react";
import Image from "next/image";
import { type Coach } from "@/components/coaches/CoachModal";
import { addCoach, updateCoach, deleteCoach } from "@/app/admin/coach-actions";
import { CoachForm } from "./CoachForm";

export type DbCoach = Coach & { id: string; order_index: number; class_name: string };

export function ManageCoaches({ initialCoaches }: { initialCoaches: DbCoach[] }) {
  const [coaches, setCoaches] = useState<DbCoach[]>(initialCoaches);
  const [isAdding, setIsAdding] = useState(false);
  const [editingCoachId, setEditingCoachId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this coach?")) return;
    
    // Optimistic
    setCoaches((prev) => prev.filter((c) => c.id !== id));
    
    try {
      await deleteCoach(id);
    } catch (error) {
      console.error(error);
      alert("Failed to delete coach.");
      // In a real app we'd revert the optimistic update here.
      window.location.reload();
    }
  };

  // Called when add/edit finishes to exit form state. Real data is refreshed via revalidatePath & component remount
  // However, since we are doing optimistic or full refresh, let's just trigger a full reload for simplicity & accuracy
  const onFormSuccess = () => {
    setIsAdding(false);
    setEditingCoachId(null);
    // Let Next.js revalidatePath handle the refresh from server. Because it's a Server Component layout, 
    // just resetting state might not fetch new data until we trigger a Next Router refresh.
    // For instant feedback without full reload if next/navigation refresh doesn't trigger:
    window.location.reload();
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end border-b border-outline-variant/10 pb-6">
        <div>
          <h2 className="font-display text-4xl text-on-surface mb-2">Manage Coaches</h2>
          <p className="font-body text-sm text-on-surface-variant">
            Update the roster of elite practitioners. Changes reflect instantly on the public directory.
          </p>
        </div>
        {!isAdding && !editingCoachId && (
          <button
            onClick={() => setIsAdding(true)}
            className="h-10 px-6 bg-primary hover:bg-primary/90 text-on-primary font-body text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] transition-colors rounded-sm"
          >
            New Coach
          </button>
        )}
      </div>

      {(isAdding || editingCoachId) && (
        <div className="bg-surface-container p-6 border border-outline-variant/20 rounded-sm mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-display text-2xl text-on-surface">
              {isAdding ? "Add New Coach" : "Edit Coach"}
            </h3>
            <button 
              onClick={() => { setIsAdding(false); setEditingCoachId(null); }}
              className="text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Cancel
            </button>
          </div>
          
          <CoachForm 
            coach={coaches.find(c => c.id === editingCoachId)} 
            onSuccess={onFormSuccess} 
          />
        </div>
      )}

      {!isAdding && !editingCoachId && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coaches.map((coach) => (
            <div key={coach.id} className="bg-[#1A1A1A] border border-outline-variant/10 rounded-sm overflow-hidden flex flex-col group relative">
              <div className="relative w-full aspect-square bg-[#111]">
                <Image 
                  src={coach.image}
                  alt={coach.name}
                  fill
                  className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setEditingCoachId(coach.id)}
                    className="p-2 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-primary hover:text-black transition-colors"
                    title="Edit"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                  </button>
                  <button
                    onClick={() => handleDelete(coach.id)}
                    className="p-2 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-error transition-colors"
                    title="Delete"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <p className="font-body text-primary text-[9px] uppercase tracking-[0.2em] font-bold mb-2 line-clamp-1">
                  {coach.specialty}
                </p>
                <h3 className="font-display text-2xl text-on-surface mb-4">{coach.name}</h3>
                <p className="font-body text-sm text-on-surface-variant line-clamp-3 mb-4">
                  {coach.bio}
                </p>
                
                <div className="mt-auto flex justify-between items-center text-xs text-on-surface-variant/60 font-body">
                  <span>Order: {coach.order_index}</span>
                  <span>Layout: {coach.class_name}</span>
                </div>
              </div>
            </div>
          ))}
          {coaches.length === 0 && (
            <div className="col-span-full py-20 text-center border border-dashed border-outline-variant/30 rounded-sm">
              <p className="font-body text-on-surface-variant">No coaches found in the database.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
