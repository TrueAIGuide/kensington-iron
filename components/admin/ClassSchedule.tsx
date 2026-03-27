"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { addClass, updateClassStatus, deleteClass } from "@/app/admin/class-actions";
import { type DbCoach } from "./ManageCoaches";

export type GymClass = {
  id: string;
  title: string;
  instructor: string;
  start_time: string;
  duration_minutes: number;
  capacity: number;
  enrolled: number;
  status: string;
};

export function ClassSchedule({ initialClasses, coaches = [] }: { initialClasses: GymClass[], coaches?: DbCoach[] }) {
  const [classes, setClasses] = useState(initialClasses);
  const [isAdding, setIsAdding] = useState(false);

  // Sync state if initialClasses changes via Next.js revalidatePath
  useEffect(() => {
    setClasses(initialClasses);
  }, [initialClasses]);

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await addClass(formData);
      setIsAdding(false);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      alert("Failed to add class");
    }
  }

  async function handleStatusChange(id: string, newStatus: string) {
    setClasses((prev) => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    try {
      await updateClassStatus(id, newStatus);
    } catch (err) {
      setClasses(initialClasses); 
      alert("Failed to update status");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this class?")) return;
    setClasses((prev) => prev.filter(c => c.id !== id));
    try {
      await deleteClass(id);
    } catch (err) {
      setClasses(initialClasses); 
      alert("Failed to delete class");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-serif text-lg tracking-tight">Upcoming Classes</h3>
          <p className="font-sans text-xs text-on-surface-variant/60 mt-0.5">
            Manage your boutique fitness schedule.
          </p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary text-sm font-sans font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          <span className="material-symbols-outlined text-[18px]">
            {isAdding ? 'close' : 'add'}
          </span>
          {isAdding ? 'Cancel' : 'New Class'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-surface-container-low border border-outline-variant/10 rounded-xl p-6 animate-in fade-in slide-in-from-top-4">
          <h4 className="font-sans font-medium text-sm mb-4">Schedule New Class</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-on-surface">
            <div>
              <label className="block text-xs uppercase tracking-wider text-on-surface-variant/70 mb-1">Class Title</label>
              <input required name="title" type="text" className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none" placeholder="e.g. HIIT Bootcamp" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-on-surface-variant/70 mb-1">Instructor</label>
              <select required name="instructor" defaultValue="" className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none appearance-none">
                <option value="" disabled>Select an instructor</option>
                {coaches.map(coach => (
                  <option key={coach.id} value={coach.name}>{coach.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-on-surface-variant/70 mb-1">Start Time</label>
              <input required name="startTime" type="datetime-local" className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none" />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs uppercase tracking-wider text-on-surface-variant/70 mb-1">Duration (min)</label>
                <input required name="duration" type="number" min="15" defaultValue="45" className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none" />
              </div>
              <div className="flex-1">
                <label className="block text-xs uppercase tracking-wider text-on-surface-variant/70 mb-1">Capacity</label>
                <input required name="capacity" type="number" min="1" defaultValue="20" className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none" />
              </div>
            </div>
          </div>
          <button type="submit" className="px-5 py-2 bg-primary text-on-primary text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
            Add to Schedule
          </button>
        </form>
      )}

      <div className="flex flex-col gap-3">
        {classes.length === 0 ? (
          <div className="text-center py-10 opacity-50 text-sm">No classes scheduled.</div>
        ) : (
          classes.map((c) => (
            <div key={c.id} className="group bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-5 flex items-center justify-between hover:border-outline-variant/30 transition-all">
              <div className="flex items-center gap-5">
                <div className="flex flex-col items-center justify-center w-14 h-14 bg-surface-container-low rounded-lg border border-outline-variant/10 text-primary">
                  <span className="text-[0.65rem] uppercase font-medium leading-none mb-1">{format(new Date(c.start_time), 'MMM')}</span>
                  <span className="text-2xl font-serif leading-none tracking-tight">{format(new Date(c.start_time), 'd')}</span>
                </div>
                <div>
                  <h4 className="font-serif text-lg tracking-tight flex items-center gap-2">
                    {c.title}
                    {c.status === 'Cancelled' && <span className="px-2 py-0.5 bg-red-500/10 text-red-500 text-[0.6rem] uppercase tracking-wider rounded font-sans">Cancelled</span>}
                    {c.status === 'Completed' && <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-[0.6rem] uppercase tracking-wider rounded font-sans">Completed</span>}
                  </h4>
                  <p className="font-sans text-xs text-on-surface-variant mt-1 flex items-center gap-3">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span> {format(new Date(c.start_time), 'h:mm a')} ({c.duration_minutes} min)</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">person</span> {c.instructor}</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">group</span> {c.enrolled}/{c.capacity}</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {c.status === 'Scheduled' && (
                  <>
                    <button onClick={() => handleStatusChange(c.id, 'Completed')} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-green-500/10 text-on-surface-variant hover:text-green-500 transition-colors" title="Mark Completed">
                      <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    </button>
                    <button onClick={() => handleStatusChange(c.id, 'Cancelled')} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-on-surface-variant hover:text-red-500 transition-colors" title="Cancel Class">
                      <span className="material-symbols-outlined text-[18px]">cancel</span>
                    </button>
                  </>
                )}
                {c.status !== 'Scheduled' && (
                  <button onClick={() => handleStatusChange(c.id, 'Scheduled')} className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" title="Restore to Scheduled">
                    <span className="material-symbols-outlined text-[18px]">restore</span>
                  </button>
                )}
                <button onClick={() => handleDelete(c.id)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-on-surface-variant/40 hover:text-red-500 transition-colors ml-2" title="Delete record">
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
