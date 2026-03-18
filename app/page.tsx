import { Navigation, Footer, Button } from "@/components/ui";
import dynamic from "next/dynamic";
import { AnimatedHero } from "@/components/home/AnimatedHero";

const TheExperience = dynamic(() => import("@/components/home/TheExperience").then((mod) => mod.TheExperience));
const Exclusivity = dynamic(() => import("@/components/home/Exclusivity").then((mod) => mod.Exclusivity));

export default function Home() {
  return (
    <main className="min-h-screen bg-surface selection:bg-primary/30">
      <Navigation />

      <AnimatedHero />

      {/* 2. As Featured In */}
      <section className="border-y border-outline-variant/30 bg-surface-container-lowest py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 opacity-80 overflow-hidden">
          <span className="font-body text-xs tracking-[0.2em] uppercase text-on-surface-variant whitespace-nowrap shrink-0">As Featured In</span>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-24">
            <span className="font-display text-2xl tracking-widest uppercase">Vogue</span>
            <span className="font-body text-3xl font-bold tracking-tighter">GQ</span>
            <span className="font-display text-2xl tracking-widest uppercase">Tatler</span>
            <span className="font-sans text-2xl font-black tracking-tight uppercase">Esquire</span>
            <span className="font-display text-xl tracking-wider">The Times</span>
          </div>
        </div>
      </section>

      <TheExperience />

      <Exclusivity />

      {/* 5. Your Ascent Starts Here */}
      <section className="py-32 bg-surface-container-lowest border-y border-outline-variant/20">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
          <h2 className="font-display text-5xl md:text-7xl mb-8">Your Ascent Starts Here.</h2>
          <p className="font-body text-lg text-on-surface-variant mb-12 opacity-80 uppercase tracking-widest text-[11px] md:text-sm">
            Join the waiting list for our Summer 2024 intake. Places are allocated via private consultation only.
          </p>
          <Button href="/memberships" variant="primary">Apply For Membership</Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
