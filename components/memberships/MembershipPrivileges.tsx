import Image from "next/image";

export function MembershipPrivileges() {
  return (
    <section className="bg-surface-container-lowest py-24 border-t border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl text-center mb-16 text-on-surface">Membership Privileges</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-auto lg:h-[500px]">
          {/* Left: Big Image Card */}
          <div className="relative group overflow-hidden rounded-sm h-[400px] lg:h-full bg-surface">
            <Image 
              src="/images/memberships/the-sanctuary.png" 
              alt="The Sanctuary"
              fill
              className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000 origin-bottom"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 p-8 w-full z-20">
              <h4 className="font-display text-xl text-on-surface mb-2">The Sanctuary</h4>
              <p className="font-body text-xs text-on-surface-variant max-w-sm leading-relaxed">
                Full access to our thermal suites, ice plunge pools, and private massage chambers.
              </p>
            </div>
          </div>

          {/* Right: Grid of 3 */}
          <div className="grid grid-rows-2 gap-4 h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[400px] lg:h-full">
              {/* Member's Lounge */}
              <div className="relative group overflow-hidden rounded-sm h-full bg-[#1A1A1A]">
                <Image 
                  src="/images/memberships/members-lounge.png" 
                  alt="Member's Lounge"
                  fill
                  className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000 origin-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 p-8 w-full z-20 flex flex-col justify-end h-full">
                  <h4 className="font-display text-lg text-on-surface mb-2">Member's Lounge</h4>
                  <p className="font-body text-[11px] text-on-surface-variant leading-relaxed opacity-80">
                    A curated nutritional menu served in our quiet, members-only space.
                  </p>
                </div>
              </div>

              {/* Elite Coaching */}
              <div className="relative group overflow-hidden rounded-sm h-full bg-[#1A1A1A]">
                <Image 
                  src="/images/memberships/elite-coaching.png" 
                  alt="Elite Coaching"
                  fill
                  className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000 origin-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 p-8 w-full z-20 flex flex-col justify-end h-full">
                  <h4 className="font-display text-lg text-on-surface mb-2">Elite Coaching</h4>
                  <p className="font-body text-[11px] text-on-surface-variant leading-relaxed opacity-80">
                    Direct mentorship from London's leading athletic performance coaches.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-sm h-[300px] lg:h-full bg-surface">
              <Image 
                src="/images/memberships/artisanal-training.png" 
                alt="Artisanal Training"
                fill
                className="object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000 origin-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent z-10" />
              <div className="absolute bottom-0 left-0 p-8 w-full z-20">
                <h4 className="font-display text-xl text-on-surface mb-2">Artisanal Training</h4>
                <p className="font-body text-xs text-on-surface-variant max-w-sm leading-relaxed">
                  State-of-the-art equipment paired with bespoke training protocols.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
