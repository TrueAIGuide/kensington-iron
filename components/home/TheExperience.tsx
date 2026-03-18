import Image from "next/image";

export function TheExperience() {
  return (
    <section className="py-24 md:py-32 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-xl">
          <h2 className="font-display text-4xl md:text-5xl mb-6">The Experience</h2>
          <p className="font-body text-on-surface-variant leading-relaxed">
            Where architectural precision meets human potential. Our spaces are designed to provide the ultimate focused environment, featuring bespoke equipment crafted for the world's most discerning athletes.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="w-12 h-12 rounded-full border border-outline-variant text-primary flex items-center justify-center hover:bg-surface-variant/30 transition-colors">
            ←
          </button>
          <button className="w-12 h-12 rounded-full border border-outline-variant text-primary flex items-center justify-center hover:bg-surface-variant/30 transition-colors">
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative h-[60vh] md:h-[70vh] rounded-lg overflow-hidden group cursor-pointer">
          <Image 
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop" 
            alt="Strength Sanctuary"
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
          <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full flex items-end gap-6 z-20">
            <h3 className="font-display text-3xl md:text-4xl text-white">Strength Sanctuary</h3>
          </div>
        </div>
        
        <div className="relative h-[60vh] md:h-[70vh] rounded-lg overflow-hidden group cursor-pointer">
          <Image 
            src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1470&auto=format&fit=crop" 
            alt="Endurance Suite"
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
          <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full flex items-end gap-6 z-20">
            <h3 className="font-display text-3xl md:text-4xl text-white">Endurance Suite</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
