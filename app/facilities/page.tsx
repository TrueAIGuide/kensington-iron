import { Navigation, Footer, Button } from "@/components/ui";

export default function Facilities() {
  return (
    <main className="min-h-screen bg-surface">
      <Navigation />
      
      {/* Header */}
      <section className="pt-40 pb-16 px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="md:w-1/2">
          <p className="font-body text-primary text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-6">
            EXQUISITE ENVIRONMENTS
          </p>
          <h1 className="font-display text-6xl md:text-7xl lg:text-[90px] leading-[0.9] text-on-surface mb-2">
            The Kinetic<br />
            <span className="text-secondary italic">Sanctuary</span>
          </h1>
        </div>
        <div className="md:w-1/2 md:pt-12">
          <p className="font-body text-sm md:text-base text-on-surface-variant max-w-md leading-relaxed">
            Designed for the discerning athlete, our facilities merge architectural precision with high-performance utility. Every square inch of Kensington Iron is curated to foster focus, recovery, and elite physical evolution.
          </p>
        </div>
      </section>

      {/* Asymmetrical Image Grid */}
      <section className="pb-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
          
          {/* Performance Floor (Large Left) */}
          <div className="md:col-span-7 relative group overflow-hidden rounded-sm h-[500px] lg:h-[600px] bg-[#1A1A1A]">
            <img 
              src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1470&auto=format&fit=crop" 
              alt="The Performance Floor" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000 origin-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full z-10">
              <p className="font-body text-primary text-[9px] font-bold tracking-[0.2em] uppercase mb-3">LEVEL ONE</p>
              <h3 className="font-display text-3xl text-on-surface mb-3">The Performance Floor</h3>
              <p className="font-body text-[11px] text-on-surface-variant max-w-md leading-relaxed">
                Precision engineering meets industrial elegance. Our main floor features bespoke Artis equipment and olympic-grade lifting platforms.
              </p>
            </div>
          </div>

          {/* The Wet Spa (Tall Right) */}
          <div className="md:col-span-5 relative group overflow-hidden rounded-sm h-[500px] lg:h-[600px] bg-[#1A1A1A]">
            <img 
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1420&auto=format&fit=crop" 
              alt="The Wet Spa" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000 origin-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full z-10">
              <p className="font-body text-primary text-[9px] font-bold tracking-[0.2em] uppercase mb-3">SUB-LEVEL</p>
              <h3 className="font-display text-3xl text-on-surface mb-3">The Wet Spa</h3>
              <p className="font-body text-[11px] text-on-surface-variant max-w-sm leading-relaxed">
                Regenerative hydrotherapy, steam infusion rooms, and our signature charcoal-filtered vitality pool.
              </p>
            </div>
          </div>

          {/* PT Enclaves (Wide Bottom Left) */}
          <div className="md:col-span-5 relative group overflow-hidden rounded-sm h-[350px] lg:h-[400px] bg-[#1A1A1A]">
            <img 
              src="https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1470&auto=format&fit=crop" 
              alt="PT Enclaves" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000 origin-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full z-10">
              <p className="font-body text-primary text-[9px] font-bold tracking-[0.2em] uppercase mb-3">PRIVATE</p>
              <h3 className="font-display text-2xl text-on-surface mb-2">PT Enclaves</h3>
              <p className="font-body text-[10px] text-on-surface-variant max-w-sm leading-relaxed mb-4">
                Secluded suites for one-on-one mastery with our elite coaching roster.
              </p>
            </div>
          </div>

          {/* Atelier Lounge (Wide Bottom Right) */}
          <div className="md:col-span-7 relative group overflow-hidden rounded-sm h-[350px] lg:h-[400px] bg-[#1A1A1A]">
            <img 
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop" 
              alt="Atelier Lounge" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000 origin-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full z-10">
              <p className="font-body text-primary text-[9px] font-bold tracking-[0.2em] uppercase mb-3">SOCIAL</p>
              <h3 className="font-display text-2xl text-on-surface mb-2">Atelier Lounge</h3>
              <p className="font-body text-[10px] text-on-surface-variant max-w-md leading-relaxed mb-4">
                A sanctuary for connection and recovery. Features an artisanal tonic bar and quiet workspace pods.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Features Icons */}
      <section className="py-24 bg-surface px-6 border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
          
          <div>
            <div className="mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h4 className="font-display text-xl text-on-surface mb-4">Digital Concierge</h4>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
              Personalized locker assignments and kit laundry services managed via our member application.
            </p>
          </div>

          <div>
            <div className="mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                <path d="M8 19v1"></path>
                <path d="M8 14v1"></path>
                <path d="M16 19v1"></path>
                <path d="M16 14v1"></path>
                <path d="M12 21v1"></path>
                <path d="M12 16v1"></path>
              </svg>
            </div>
            <h4 className="font-display text-xl text-on-surface mb-4">Spa-Grade Suites</h4>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
              Private rain-head showers stocked with custom Atelier scents and premium Dyson grooming tech.
            </p>
          </div>

          <div>
            <div className="mb-6 flex gap-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
                <path d="M7 2v20"></path>
                <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
              </svg>
            </div>
            <h4 className="font-display text-xl text-on-surface mb-4">Nutritional Bar</h4>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
              Pre and post-session protocols curated by our in-house performance nutritionists.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-[#171717] border-t border-outline-variant/10 text-center px-6">
        <h2 className="font-display text-4xl md:text-5xl mb-6 text-on-surface max-w-2xl mx-auto leading-tight">
          Experience Kensington Iron<br/>in person.
        </h2>
        <p className="font-body text-sm text-on-surface-variant mb-12 max-w-lg mx-auto">
          Private tours are available by appointment for prospective members.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button href="/contact" variant="primary" className="!text-[10px] tracking-[0.2em] font-bold !px-8 !py-4 w-full sm:w-auto">
            BOOK A PRIVATE TOUR
          </Button>
          <Button href="/memberships" variant="secondary" className="!text-[10px] tracking-[0.2em] font-bold !px-8 !py-4 border-none text-primary hover:bg-primary/10 w-full sm:w-auto">
            VIEW MEMBERSHIPS
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
