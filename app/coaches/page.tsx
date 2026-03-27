import { Navigation, Footer, Button } from "@/components/ui";
import { CoachDirectory } from "@/components/coaches/CoachDirectory";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

export default async function Coaches() {
  const supabase = await createClient();
  const { data: coaches } = await supabase
    .from("coaches")
    .select("*")
    .order("order_index", { ascending: true });

  const parsedCoaches = coaches?.map((c) => ({
    id: c.id,
    name: c.name,
    specialty: c.specialty,
    image: c.image,
    className: c.class_name,
    bio: c.bio,
  })) || [];

  return (
    <main className="min-h-screen bg-surface">
      <Navigation />
      
      {/* Header */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 justify-between">
        <div className="md:w-1/2">
          <p className="font-body text-primary text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-6">
            OUR ELITE PRACTITIONERS
          </p>
          <h1 className="font-display text-6xl md:text-[80px] leading-[0.9] text-on-surface mb-2">
            Master Your<br />
            <span className="text-secondary italic">Movement</span>
          </h1>
        </div>
        <div className="md:w-1/3 md:pt-16">
          <p className="font-body text-sm text-on-surface-variant leading-relaxed">
            Our coaches are not just trainers; they are architects of human potential. Each brings a unique mastery of biomechanics, performance, and longevity to the Atelier.
          </p>
        </div>
      </section>

      {/* Asymmetrical Grid */}
      <CoachDirectory coaches={parsedCoaches} />

      {/* Quote & CTA */}
      <section className="py-32 bg-[#171717] border-t border-outline-variant/10 text-center px-6">
        <h2 className="font-display text-4xl md:text-5xl max-w-3xl mx-auto leading-tight text-on-surface mb-12">
          "Precision is the bridge between aspiration and achievement."
        </h2>
        
        <div className="w-16 h-[1px] bg-primary mx-auto mb-8 opacity-50"></div>
        
        <p className="font-body text-on-surface-variant text-[9px] uppercase tracking-[0.3em] font-medium mb-12">
          THE ATELIER PHILOSOPHY
        </p>
        
        <div className="flex justify-center">
          <Button href="/contact" variant="secondary" className="!text-[10px] tracking-[0.2em] font-bold border-outline-variant/30 text-primary hover:bg-primary/5">
            DISCOVER OUR TRAINING METHODOLOGY
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
