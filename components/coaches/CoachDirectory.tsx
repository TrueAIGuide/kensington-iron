"use client";

import { useState } from "react";
import Image from "next/image";
import { CoachModal, type Coach } from "./CoachModal";

export function CoachDirectory({ coaches }: { coaches: Coach[] }) {
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);

  const handleCardClick = (coach: Coach) => {
    setSelectedCoach(coach);
  };

  const closeModal = () => {
    setSelectedCoach(null);
  };

  // Dynamically split into 3 columns
  const column1 = coaches.filter((_, i) => i % 3 === 0);
  const column2 = coaches.filter((_, i) => i % 3 === 1);
  const column3 = coaches.filter((_, i) => i % 3 === 2);

  return (
    <>
      <section className="pb-32 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 gap-y-16">
        {/* Column 1 */}
        <div className="flex flex-col gap-16">
          {column1.map((coach, idx) => (
             <CoachCard key={coach.id || idx} coach={coach} onClick={() => handleCardClick(coach)} />
          ))}
        </div>
        {/* Column 2 */}
        <div className="flex flex-col gap-16 md:pt-24">
          {column2.map((coach, idx) => (
             <CoachCard key={coach.id || idx} coach={coach} onClick={() => handleCardClick(coach)} />
          ))}
        </div>
        {/* Column 3 */}
        <div className="flex flex-col gap-16">
          {column3.map((coach, idx) => (
             <CoachCard key={coach.id || idx} coach={coach} onClick={() => handleCardClick(coach)} />
          ))}
        </div>
      </section>

      <CoachModal
        isOpen={!!selectedCoach}
        coach={selectedCoach}
        onClose={closeModal}
      />
    </>
  );
}

function CoachCard({ coach, onClick }: { coach: Coach; onClick: () => void }) {
  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className={`relative w-full overflow-hidden bg-[#1A1A1A] rounded-sm mb-6 ${coach.className}`}>
        <Image 
          src={coach.image} 
          alt={coach.name}
          fill
          className="object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-display text-xl md:text-2xl text-on-surface transition-colors">{coach.name}</h3>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1 opacity-100 transition-opacity transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-300">
          <path d="M7 17l9.2-9.2M17 17V7H7"/>
        </svg>
      </div>
      <p className="font-body text-[8px] md:text-[9px] uppercase tracking-[0.15em] text-on-surface-variant max-w-[80%]">
        SPECIALTY: {coach.specialty}
      </p>
    </div>
  );
}
