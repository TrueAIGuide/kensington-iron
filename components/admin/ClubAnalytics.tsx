"use client";

import { useMemo } from "react";
import { type GymClass } from "./ClassSchedule";
import { format } from "date-fns";

export type AnalyticsData = {
  leads: { total: number; new: number; contacted: number; converted: number };
  members: { total: number; active: number; expired: number };
  classes: GymClass[];
  messages: { total: number; unread: number };
};

function KpiOverview({ label, value, icon, subtext }: { label: string; value: string | number; icon: string; subtext?: string }) {
  return (
    <div className="rounded-xl bg-surface-container-lowest border border-outline-variant/10 px-6 py-5 flex items-start justify-between transition-all duration-300 hover:border-outline-variant/25">
      <div>
        <p className="font-sans text-xs uppercase tracking-[0.1em] text-on-surface-variant/60 mb-2">{label}</p>
        <p className="font-serif text-3xl tracking-tight text-on-surface flex items-baseline gap-2">
          {value}
          {subtext && <span className="font-sans text-xs text-on-surface-variant/60 font-normal">{subtext}</span>}
        </p>
      </div>
      <span className="material-symbols-outlined text-primary/40 text-[28px]">{icon}</span>
    </div>
  );
}

export function ClubAnalytics({ data }: { data: AnalyticsData }) {
  const { leads, members, classes, messages } = data;

  // Calculate Class Occupancy Rate
  const { avgFillRate, upcomingClasses } = useMemo(() => {
    const upcoming = classes.filter(c => c.status === "Scheduled").slice(0, 5); // top 5
    if (classes.length === 0) return { avgFillRate: 0, upcomingClasses: upcoming };

    const totalCap = classes.reduce((sum, c) => sum + c.capacity, 0);
    if (totalCap === 0) return { avgFillRate: 0, upcomingClasses: upcoming };
    
    const totalEnrolled = classes.reduce((sum, c) => sum + c.enrolled, 0);
    const avgFillRate = Math.round((totalEnrolled / totalCap) * 100);
    return { avgFillRate, upcomingClasses: upcoming };
  }, [classes]);

  // Lead Distribution Percentages
  const newPct = leads.total > 0 ? (leads.new / leads.total) * 100 : 0;
  const contactedPct = leads.total > 0 ? (leads.contacted / leads.total) * 100 : 0;
  const convertedPct = leads.total > 0 ? (leads.converted / leads.total) * 100 : 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* KPI Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KpiOverview 
          label="Active Members" 
          value={members.total} 
          icon="group" 
          subtext={`${members.active} active · ${members.expired} expired`} 
        />
        <KpiOverview label="Total Leads" value={leads.total} icon="person_add" subtext="all time" />
        <KpiOverview label="Class Occupancy" value={`${avgFillRate}%`} icon="equalizer" subtext="avg fill" />
        <KpiOverview label="Unread Messages" value={messages.unread} icon="mark_email_unread" subtext={`of ${messages.total} total`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Lead Conversion Pipeline */}
        <section className="rounded-xl bg-surface-container-lowest border border-outline-variant/10 p-6 flex flex-col">
          <h3 className="font-serif text-lg tracking-tight mb-1">Lead Conversion Pipeline</h3>
          <p className="font-sans text-xs text-on-surface-variant/60 mb-8">
            Distribution of sales leads by their current status.
          </p>

          <div className="flex-1 flex flex-col justify-center">
            {/* The Stacked Bar */}
            <div className="h-4 w-full bg-surface-container-high rounded-full overflow-hidden flex mb-6">
              <div style={{ width: `${newPct}%` }} className="h-full bg-blue-500/80 transition-all duration-1000" title={`New: ${leads.new}`} />
              <div style={{ width: `${contactedPct}%` }} className="h-full bg-yellow-500/80 transition-all duration-1000" title={`Contacted: ${leads.contacted}`} />
              <div style={{ width: `${convertedPct}%` }} className="h-full bg-green-500/80 transition-all duration-1000" title={`Converted: ${leads.converted}`} />
            </div>

            {/* Legend */}
            <div className="flex justify-between items-center px-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500/80"></span>
                <div>
                  <p className="font-sans text-xs text-on-surface-variant uppercase tracking-wider">New</p>
                  <p className="font-serif tracking-tight text-lg">{leads.new}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                <div>
                  <p className="font-sans text-xs text-on-surface-variant uppercase tracking-wider">Contacted</p>
                  <p className="font-serif tracking-tight text-lg">{leads.contacted}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                <div>
                  <p className="font-sans text-xs text-on-surface-variant uppercase tracking-wider">Converted</p>
                  <p className="font-serif tracking-tight text-lg">{leads.converted}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming classes occupancy */}
        <section className="rounded-xl bg-surface-container-lowest border border-outline-variant/10 p-6">
          <h3 className="font-serif text-lg tracking-tight mb-1">Upcoming Class Fill Rates</h3>
          <p className="font-sans text-xs text-on-surface-variant/60 mb-6">
            Enrollment capacity for the next 5 scheduled sessions.
          </p>

          <div className="space-y-5">
            {upcomingClasses.length === 0 ? (
              <p className="text-sm text-on-surface-variant/50 italic">No upcoming classes scheduled.</p>
            ) : (
              upcomingClasses.map((c) => {
                const fillPct = c.capacity > 0 ? Math.min(100, (c.enrolled / c.capacity) * 100) : 0;
                const isFull = fillPct >= 100;
                
                return (
                  <div key={c.id}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-serif tracking-tight flex items-center gap-2">
                        {c.title}
                        {isFull && <span className="text-[10px] uppercase font-sans tracking-widest text-[#d4af37] border border-[#d4af37]/30 px-1.5 py-0.5 rounded-sm bg-[#d4af37]/10">Waitlist</span>}
                      </span>
                      <span className="font-sans text-xs text-on-surface-variant mt-1">
                        {format(new Date(c.start_time), "MMM d, h:mm a")}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                        <div 
                          style={{ width: `${fillPct}%` }} 
                          className={`h-full rounded-full transition-all duration-1000 ${isFull ? 'bg-[#d4af37]' : 'bg-primary'}`} 
                        />
                      </div>
                      <span className="font-sans text-xs font-medium w-10 text-right text-on-surface-variant">
                        {c.enrolled}/{c.capacity}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
