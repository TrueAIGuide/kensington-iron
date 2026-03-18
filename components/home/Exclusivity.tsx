import Image from "next/image";

export function Exclusivity() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
        <div className="order-2 lg:order-1">
          <p className="font-body text-primary text-[11px] font-bold tracking-[0.2em] uppercase mb-6">
            Exclusivity Defined
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-8">
            A limited membership of 250 individuals.
          </h2>
          <p className="font-body text-on-surface-variant leading-relaxed mb-12">
            To maintain the serenity and standards of Kensington Iron, we operate a strictly capped membership model. Our patrons enjoy uncrowded facilities, personalized nutrition programs, and concierge-level service at every visit.
          </p>
          
          <div className="space-y-10">
            <div className="flex gap-6 items-start">
              <div className="mt-1 w-6 h-6 rounded bg-primary/20 flex items-center justify-center shrink-0">
                <span className="text-primary text-xs">◆</span>
              </div>
              <div>
                <h4 className="font-body font-bold text-on-surface mb-2">Bespoke Coaching</h4>
                <p className="font-body text-sm text-on-surface-variant">One-to-one guidance from Olympians and world-class therapists.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="mt-1 w-6 h-6 rounded bg-primary/20 flex items-center justify-center shrink-0">
                <span className="text-primary text-xs">▲</span>
              </div>
              <div>
                <h4 className="font-body font-bold text-on-surface mb-2">Post-Work Rituals</h4>
                <p className="font-body text-sm text-on-surface-variant">Cryotherapy, infra-red saunas, and compression recovery lounges.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="order-1 lg:order-2 relative aspect-square w-full max-w-lg mx-auto lg:ml-auto">
          <div className="absolute inset-0 bg-[#e0e0e0] rounded-sm flex justify-center items-end overflow-hidden pb-8">
            <Image 
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop" 
              alt="Personal Training"
              fill
              unoptimized
              className="object-cover mix-blend-multiply opacity-50 grayscale contrast-125"
            />
          </div>
          
          <div className="absolute -bottom-8 -left-8 md:-left-12 bg-surface-container-high p-8 md:p-10 rounded-sm shadow-2xl max-w-[280px]">
            <span className="font-display text-5xl md:text-6xl text-primary block mb-4">98%</span>
            <p className="font-body text-xs md:text-sm text-on-surface-variant leading-relaxed">
              Client retention rate since our founding in Mayfair, 2018.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
