import { createClient } from "@/lib/supabase/server";
import type { Lead } from "@/lib/supabase";
import LeadsTable from "@/components/admin/LeadsTable";
import MembersTable from "@/components/admin/MembersTable";
import ManageStaff from "@/components/admin/ManageStaff";
import { ContactMessagesTable } from "@/components/admin/ContactMessagesTable";
import { ClassSchedule, GymClass } from "@/components/admin/ClassSchedule";
import { ManageCoaches, DbCoach } from "@/components/admin/ManageCoaches";
import { ClubAnalytics, type AnalyticsData } from "@/components/admin/ClubAnalytics";
import RevenueWidget from "@/components/admin/RevenueWidget";
import type { Metadata } from "next";
import { logout } from "./login/actions";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Admin Dashboard — Kensington Iron",
  description: "Internal lead management and club analytics.",
  robots: "noindex, nofollow",
};

export const dynamic = "force-dynamic";

function getMemberStatusCounts(members: any[]) {
  const now = new Date();
  let activeCount = 0;
  let expiredCount = 0;
  
  members.forEach(m => {
    const d = new Date(m.created_at);
    d.setDate(d.getDate() + 30);
    if (d > now) activeCount++;
    else expiredCount++;
  });
  
  return { activeCount, expiredCount };
}

export default async function AdminPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const currentTab = (searchParams?.tab as string) || "leads";

  /* ─── Auth & Role Check ─────────────────── */
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <div>Not authenticated</div>;
  }

  const { data: profile } = await supabase
    .from("staff_profiles")
    .select("role, email")
    .eq("id", user.id)
    .single();

  const role = profile?.role || "staff";
  const userEmail = user.email || profile?.email || "";

  /* ─── Sidebar nav items ────────────────────────── */
  const NAV_ITEMS = [
    { icon: "dashboard", label: "Dashboard", id: "dashboard", active: currentTab === "dashboard" },
    { icon: "person_add", label: "Lead Management", id: "leads", active: currentTab === "leads" },
    { icon: "group", label: "Active Members", id: "members", active: currentTab === "members" },
    { icon: "calendar_today", label: "Class Schedule", id: "schedule", active: currentTab === "schedule" },
    { icon: "sports_martial_arts", label: "Coaches", id: "coaches", active: currentTab === "coaches" },
    { icon: "analytics", label: "Club Analytics", id: "analytics", active: currentTab === "analytics" },
  ];

  if (role === "super-admin") {
    NAV_ITEMS.push({ icon: "admin_panel_settings", label: "Manage Staff", id: "staff", active: currentTab === "staff" });
  }

  NAV_ITEMS.push({ icon: "settings", label: "Settings", id: "settings", active: false });

  let safeLeads: Lead[] = [];
  let allStaff: any[] = [];
  let contactMessages: any[] = [];
  let scheduledClasses: GymClass[] = [];
  let dbCoaches: DbCoach[] = [];
  let allMembers: any[] = [];
  let errorMsg = null;
  let totalLeads = 0;
  let unreadMessages = 0;
  let totalStaff = 0;

  if (currentTab === "dashboard") {
    const [leadsRes, messagesRes, staffRes, membersRes] = await Promise.all([
      supabase.from("leads").select("id, status"),
      supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
      supabase.from("staff_profiles").select("id"),
      supabase.from("members").select("*")
    ]);

    totalLeads = leadsRes.data?.length || 0;
    
    if (messagesRes.error) errorMsg = messagesRes.error.message;
    contactMessages = messagesRes.data || [];
    unreadMessages = contactMessages.filter((m: any) => m.status === "Unread").length;

    totalStaff = staffRes.data?.length || 0;
    allMembers = membersRes.data || [];
  } else if (currentTab === "leads") {
    const [leadsRes, membersRes] = await Promise.all([
      supabase.from("leads").select("*").order("created_at", { ascending: false }),
      supabase.from("members").select("*")
    ]);

    if (leadsRes.error) errorMsg = leadsRes.error.message;
    safeLeads = leadsRes.data ?? [];
    totalLeads = safeLeads.length;
    allMembers = membersRes.data || [];
  } else if (currentTab === "members") {
    const { data: membersData, error } = await supabase
      .from("members")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) errorMsg = error.message;
    allMembers = membersData ?? [];
  } else if (currentTab === "schedule") {
    const [classRes, coachRes] = await Promise.all([
      supabase.from("classes").select("*").order("start_time", { ascending: true }),
      supabase.from("coaches").select("*").order("name", { ascending: true })
    ]);
      
    if (classRes.error) errorMsg = classRes.error.message;
    scheduledClasses = classRes.data ?? [];
    dbCoaches = coachRes.data ?? [];
  } else if (currentTab === "coaches") {
    const { data: coachesData, error } = await supabase
      .from("coaches")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) errorMsg = error.message;
    dbCoaches = coachesData ?? [];
  } else if (currentTab === "staff" && role === "super-admin") {
    const { data: staff, error } = await supabase
      .from("staff_profiles")
      .select("*")
      .order("created_at", { ascending: false });
      
    if (error) errorMsg = error.message;
    allStaff = staff ?? [];
  } else if (currentTab === "analytics") {
    const [leadsRes, membersRes, classesRes, msgsRes] = await Promise.all([
      supabase.from("leads").select("status"),
      supabase.from("members").select("*"),
      supabase.from("classes").select("*").order("start_time", { ascending: true }),
      supabase.from("contact_messages").select("status")
    ]);

    if (leadsRes.error || classesRes.error) {
      errorMsg = leadsRes.error?.message || classesRes.error?.message;
    }

    const allLeads = leadsRes.data || [];
    const allMsgs = msgsRes.data || [];
    allMembers = membersRes.data || [];
    
    (global as any).analyticsData = {
      leads: {
        total: allLeads.length,
        new: allLeads.filter(l => l.status === "New").length,
        contacted: allLeads.filter(l => l.status === "Contacted").length,
        converted: allLeads.filter(l => l.status === "Converted").length,
      },
      members: { total: allMembers.length, active: getMemberStatusCounts(allMembers).activeCount, expired: getMemberStatusCounts(allMembers).expiredCount },
      classes: classesRes.data || [],
      messages: {
        total: allMsgs.length,
        unread: allMsgs.filter(m => m.status === "Unread").length
      }
    };
  }

  const { activeCount, expiredCount } = getMemberStatusCounts(allMembers);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0"
      />

      <div className="flex min-h-screen bg-surface text-on-surface">
        <aside className="hidden lg:flex flex-col w-64 bg-surface-container-lowest border-r border-outline-variant/10 py-8 px-5 shrink-0">
          <div className="mb-12 px-2">
            <h1 className="font-serif text-xl text-primary tracking-tight">Kensington Iron</h1>
            <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-on-surface-variant/60 mt-0.5">Mayfair Boutique</p>
          </div>

          <nav className="flex flex-col gap-1 flex-1">
            {NAV_ITEMS.map(({ icon, label, id, active }) => (
              <Link
                key={id}
                href={`/admin?tab=${id}`}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-sans transition-all duration-200
                  ${active ? "bg-primary/10 text-primary font-medium" : "text-on-surface-variant/70 hover:text-on-surface hover:bg-surface-container-low/60"}
                `}
              >
                <span className="material-symbols-outlined text-[20px]">{icon}</span>
                {label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-outline-variant/10 pt-4 mt-auto">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 px-3">
                <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-on-primary text-xs font-medium font-sans uppercase">
                  {userEmail?.substring(0, 2)}
                </div>
                <div className="truncate">
                  <p className="font-sans text-xs text-on-surface capitalize truncate">{role.replace("-", " ")}</p>
                  <p className="font-sans text-[0.65rem] text-on-surface-variant/50 truncate w-40">{userEmail}</p>
                </div>
              </div>
              
              <form action={logout}>
                <button type="submit" className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-sans text-on-surface-variant/70 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200">
                  <span className="material-symbols-outlined text-[20px]">logout</span>
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto w-full max-w-full">
          <header className="sticky top-0 z-10 glass border-b border-outline-variant/10 px-8 py-5 flex items-center justify-between">
            <h2 className="font-serif text-xl tracking-tight capitalize">
              {NAV_ITEMS.find(n => n.id === currentTab)?.label || "Dashboard"}
            </h2>
          </header>

          <div className="px-8 py-8 w-full max-w-scren-2xl mx-auto">
            {currentTab === "dashboard" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10 w-full">
                  <KpiCard label="Active Memberships" value={
                    <div className="flex items-baseline gap-2">
                       <span>{allMembers.length} <span className="text-sm text-on-surface-variant ml-1 font-sans">total</span></span>
                    </div>
                  } icon="group" subtext={`${activeCount} active · ${expiredCount} expired`} />
                  <KpiCard label="Total Leads" value={totalLeads.toString()} icon="person_add" />
                  <KpiCard label="Unread Messages" value={unreadMessages.toString()} icon="mail" />
                  <KpiCard label="Total Staff Members" value={totalStaff.toString()} icon="badge" />
                </div>
                {errorMsg && (
                  <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/20 px-5 py-3 text-red-300 text-sm font-sans">
                    <span className="font-medium">Error loading dashboard:</span> {errorMsg}
                  </div>
                )}
                
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
                   <RevenueWidget members={allMembers} />
                   <section className="rounded-xl bg-surface-container-lowest border border-outline-variant/10 overflow-hidden h-full">
                      <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/10">
                        <div>
                          <h3 className="font-serif text-lg tracking-tight">Recent Inquiries</h3>
                          <p className="font-sans text-xs text-on-surface-variant/60 mt-0.5">
                            Messages submitted through the public Contact Us form.
                          </p>
                        </div>
                      </div>
                      <ContactMessagesTable messages={contactMessages} />
                  </section>
                </div>
              </>
            )}

            {currentTab === "leads" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                  <KpiCard label="Total Leads" value={totalLeads.toString()} icon="person_add" />
                  <KpiCard label="Active Members" value={
                    <div className="flex items-baseline gap-2">
                       <span>{allMembers.length} <span className="text-sm text-on-surface-variant ml-1 font-sans">total</span></span>
                    </div>
                  } icon="group" subtext={`${activeCount} active · ${expiredCount} expired`} />
                  <KpiCard label="Platform Conversion" value={`${allMembers.length > 0 ? Math.round((allMembers.length / (totalLeads + allMembers.length)) * 100) : 0}%`} icon="trending_up" />
                </div>
                {errorMsg && (
                  <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/20 px-5 py-3 text-red-300 text-sm font-sans">
                    <span className="font-medium">Error loading leads:</span> {errorMsg}
                  </div>
                )}
                <section className="rounded-xl bg-surface-container-lowest border border-outline-variant/10 overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/10">
                    <div>
                      <h3 className="font-serif text-lg tracking-tight">User Leads</h3>
                      <p className="font-sans text-xs text-on-surface-variant/60 mt-0.5">
                        Manage and convert potential members from Mayfair district.
                      </p>
                    </div>
                  </div>
                  <LeadsTable leads={safeLeads} />
                </section>
              </>
            )}

            {currentTab === "members" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                  <KpiCard label="Active Memberships" value={
                    <div className="flex items-baseline gap-2">
                       <span>{allMembers.length} <span className="text-sm text-on-surface-variant ml-1 font-sans">total</span></span>
                    </div>
                  } icon="group" subtext={`${activeCount} active · ${expiredCount} expired`} />
                  <div className="col-span-2 md:col-span-2">
                    <RevenueWidget members={allMembers} />
                  </div>
                </div>
                {errorMsg && (
                  <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/20 px-5 py-3 text-red-300 text-sm font-sans">
                    <span className="font-medium">Error loading members:</span> {errorMsg}
                  </div>
                )}
                <section className="rounded-xl bg-surface-container-lowest border border-outline-variant/10 overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/10">
                    <div>
                      <h3 className="font-serif text-lg tracking-tight">Active Members</h3>
                      <p className="font-sans text-xs text-on-surface-variant/60 mt-0.5">
                        Manage current active subscribers and their plan tiers.
                      </p>
                    </div>
                  </div>
                  <MembersTable members={allMembers} />
                </section>
              </>
            )}

            {currentTab === "schedule" && (
              <>
                {errorMsg && (
                  <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/20 px-5 py-3 text-red-300 text-sm font-sans">
                    <span className="font-medium">Error loading schedule:</span> {errorMsg}
                  </div>
                )}
                <ClassSchedule initialClasses={scheduledClasses} coaches={dbCoaches} />
              </>
            )}

            {currentTab === "staff" && role === "super-admin" && (
              <>
                {errorMsg && (
                  <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/20 px-5 py-3 text-red-300 text-sm font-sans">
                    <span className="font-medium">Error loading staff:</span> {errorMsg}
                  </div>
                )}
                <ManageStaff initialStaff={allStaff} />
              </>
            )}

            {currentTab === "coaches" && (
              <>
                {errorMsg && (
                  <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/20 px-5 py-3 text-red-300 text-sm font-sans">
                    <span className="font-medium">Error loading coaches:</span> {errorMsg}
                  </div>
                )}
                <ManageCoaches initialCoaches={dbCoaches} />
              </>
            )}

            {currentTab === "analytics" && (
              <>
                {errorMsg && (
                  <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/20 px-5 py-3 text-red-300 text-sm font-sans">
                    <span className="font-medium">Error loading analytics:</span> {errorMsg}
                  </div>
                )}
                <div className="mb-8">
                  <RevenueWidget members={allMembers} />
                </div>
                {(global as any).analyticsData && <ClubAnalytics data={(global as any).analyticsData} />}
              </>
            )}

            {currentTab !== "members" && currentTab !== "leads" && currentTab !== "staff" && currentTab !== "dashboard" && currentTab !== "schedule" && currentTab !== "coaches" && currentTab !== "analytics" && (
              <div className="flex flex-col items-center justify-center py-24 text-on-surface-variant border border-dashed border-outline-variant/20 rounded-xl">
                <span className="material-symbols-outlined text-4xl mb-3 opacity-40">construction</span>
                <p className="font-serif text-lg text-on-surface">Under Construction</p>
                <p className="font-sans text-sm opacity-60 mt-1">This module is currently in development.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

function KpiCard({ label, value, icon, subtext }: { label: string; value: React.ReactNode; icon: string; subtext?: string }) {
  return (
    <div className="rounded-xl bg-surface-container-lowest border border-outline-variant/10 px-6 py-5 flex items-start justify-between transition-all duration-300 hover:border-outline-variant/25">
      <div>
        <p className="font-sans text-xs uppercase tracking-[0.1em] text-on-surface-variant/60 mb-2">{label}</p>
        <div className="font-serif text-3xl tracking-tight text-on-surface">{value}</div>
        {subtext && <p className="font-sans text-xs text-on-surface-variant/60 mt-2">{subtext}</p>}
      </div>
      <span className="material-symbols-outlined text-primary/40 text-[28px]">{icon}</span>
    </div>
  );
}
