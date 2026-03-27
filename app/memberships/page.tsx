import { Navigation, Footer, Button } from "@/components/ui";
import { EditorialCard } from "@/components/EditorialCard";
import dynamic from "next/dynamic";

const MembershipPrivileges = dynamic(() => import("@/components/memberships/MembershipPrivileges").then((mod) => mod.MembershipPrivileges));
import { CheckoutButton } from "@/components/memberships/CheckoutButton";
import { SuccessVerifier } from "@/components/memberships/SuccessVerifier";
import { Suspense } from "react";

export default function Memberships() {
  return (
    <main className="min-h-screen bg-surface">
      <Navigation />
      <Suspense fallback={null}>
        <SuccessVerifier />
      </Suspense>
      
      {/* Header */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div>
          <p className="font-body text-primary text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4">
            Refined Excellence
          </p>
          <h1 className="font-display text-6xl md:text-7xl lg:text-[90px] leading-[0.9] text-on-surface">
            Join the<br />
            <span className="text-primary italic">Circle</span>
          </h1>
        </div>
        <div className="md:max-w-md pb-4">
          <p className="font-body text-sm text-on-surface-variant leading-relaxed">
            Experience a new standard of physical culture in the heart of Mayfair. Our tiers are designed to provide the ultimate balance of performance and recovery.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="pb-32 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {/* Tier 1: Essential */}
        <div className="bg-surface-container-lowest/20 rounded-sm p-8 flex flex-col justify-between border border-transparent hover:border-outline-variant/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/20">
          <div>
            <h3 className="font-display text-2xl text-on-surface mb-1">Essential</h3>
            <p className="font-body text-[9px] text-on-surface-variant uppercase tracking-[0.2em] mb-8">The Foundation</p>
            <div className="mb-10 flex items-baseline gap-2">
              <span className="font-display text-4xl text-primary">£250</span>
              <span className="font-body text-on-surface-variant text-[10px] tracking-wider">/ monthly</span>
            </div>
            <ul className="space-y-4 mb-12 font-body text-[11px] text-on-surface-variant">
              <li className="flex gap-4 items-center">
                <div className="w-3 h-3 rounded-full bg-primary/20 flex items-center justify-center"><span className="text-primary text-[7px]">✓</span></div>
                Unlimited Atelier Access
              </li>
              <li className="flex gap-4 items-center">
                <div className="w-3 h-3 rounded-full bg-primary/20 flex items-center justify-center"><span className="text-primary text-[7px]">✓</span></div>
                Signature Group Classes
              </li>
              <li className="flex gap-4 items-center">
                <div className="w-3 h-3 rounded-full bg-primary/20 flex items-center justify-center"><span className="text-primary text-[7px]">✓</span></div>
                Luxury Locker Facilities
              </li>
              <li className="flex gap-4 items-center opacity-40">
                <div className="w-3 h-3 rounded-full bg-outline-variant/20 flex items-center justify-center"></div>
                Private Spa Access
              </li>
            </ul>
          </div>
          <CheckoutButton priceId="price_1TF4e6Dc9AXL3r8M3J172ad7" planName="Essential" variant="secondary" className="w-full text-center block !text-[10px] tracking-widest !py-4 border-outline-variant/30 text-on-surface-variant hover:text-on-surface" />
        </div>

        {/* Tier 2: Premium */}
        <div className="bg-surface-container-lowest/20 rounded-sm p-8 flex flex-col justify-between relative border border-transparent hover:border-outline-variant/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/20">
          <div className="absolute top-0 right-8 -mt-3 bg-primary text-on-primary font-body text-[8px] font-bold uppercase tracking-[0.2em] px-3 py-1">
            WAITLISTED
          </div>
          <div>
            <h3 className="font-display text-2xl text-on-surface mb-1">Premium</h3>
            <p className="font-body text-[9px] text-on-surface-variant uppercase tracking-[0.2em] mb-8">The Standard</p>
            <div className="mb-10 flex items-baseline gap-2">
              <span className="font-display text-4xl text-primary">£450</span>
              <span className="font-body text-on-surface-variant text-[10px] tracking-wider">/ monthly</span>
            </div>
            <ul className="space-y-4 mb-12 font-body text-[11px] text-on-surface-variant">
              <li className="flex gap-4 items-center">
                <div className="w-3 h-3 rounded-full bg-primary/20 flex items-center justify-center"><span className="text-primary text-[7px]">✓</span></div>
                All Essential Features
              </li>
              <li className="flex gap-4 items-center">
                <div className="w-3 h-3 rounded-full bg-primary/20 flex items-center justify-center"><span className="text-primary text-[7px]">✓</span></div>
                4 Personal Training Sessions
              </li>
              <li className="flex gap-4 items-center">
                <div className="w-3 h-3 rounded-full bg-primary/20 flex items-center justify-center"><span className="text-primary text-[7px]">✓</span></div>
                Recovery Suite & Cryo
              </li>
              <li className="flex gap-4 items-center">
                <div className="w-3 h-3 rounded-full bg-primary/20 flex items-center justify-center"><span className="text-primary text-[7px]">✓</span></div>
                Priority Booking
              </li>
            </ul>
          </div>
          <CheckoutButton priceId="price_1TF4eDDc9AXL3r8M2JasOE60" planName="Premium" variant="primary" className="w-full text-center block !text-[10px] tracking-widest !py-4" />
        </div>

        {/* Tier 3: Exclusive */}
        <div className="bg-surface-container-lowest/20 rounded-sm p-8 flex flex-col justify-between border border-transparent hover:border-outline-variant/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/20">
          <div>
            <h3 className="font-display text-2xl text-primary mb-1">Exclusive</h3>
            <p className="font-body text-[9px] text-on-surface-variant uppercase tracking-[0.2em] mb-8">Unrivaled Access</p>
            <div className="mb-10 flex items-baseline gap-2">
              <span className="font-display text-4xl text-primary">£850</span>
              <span className="font-body text-on-surface-variant text-[10px] tracking-wider">/ monthly</span>
            </div>
            <ul className="space-y-4 mb-12 font-body text-[11px] text-on-surface-variant">
              <li className="flex gap-4 items-center">
                <div className="w-3 h-3 rounded-full bg-primary/20 flex items-center justify-center"><span className="text-primary text-[7px]">✓</span></div>
                Dedicated Wellness Concierge
              </li>
              <li className="flex gap-4 items-center">
                <div className="w-3 h-3 rounded-full bg-primary/20 flex items-center justify-center"><span className="text-primary text-[7px]">✓</span></div>
                Private Guest Privileges
              </li>
              <li className="flex gap-4 items-center">
                <div className="w-3 h-3 rounded-full bg-primary/20 flex items-center justify-center"><span className="text-primary text-[7px]">✓</span></div>
                Laundry & Kit Service
              </li>
              <li className="flex gap-4 items-center">
                <div className="w-3 h-3 rounded-full bg-primary/20 flex items-center justify-center"><span className="text-primary text-[7px]">✓</span></div>
                Unlimited Spa & Massage
              </li>
            </ul>
          </div>
          <CheckoutButton priceId="price_1TF4eEDc9AXL3r8M4GYmbVea" planName="Exclusive" variant="secondary" className="w-full text-center block border-primary text-primary hover:bg-primary/10 !text-[10px] tracking-widest !py-4" />
        </div>
      </section>

      <MembershipPrivileges />

      {/* Ready to transcend? */}
      <section className="py-24 max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl mb-6">Ready to transcend?</h2>
        <p className="font-body text-xs text-on-surface-variant mb-10 max-w-lg mx-auto leading-relaxed">
          Initial consultations are mandatory for all new members to ensure we tailor the experience to your biological profile.
        </p>
        <Button href="/contact" variant="primary" className="!px-8 !py-4 !text-[10px] tracking-widest font-bold">BOOK CONSULTATION</Button>
      </section>

      <Footer />
    </main>
  );
}
