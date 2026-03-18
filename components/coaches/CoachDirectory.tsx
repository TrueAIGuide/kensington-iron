"use client";

import { useState } from "react";
import Image from "next/image";
import { CoachModal, type Coach } from "./CoachModal";

const COACHES: Coach[] = [
  { 
    name: "Alexander Thorne", 
    specialty: "OLYMPIC WEIGHTLIFTING & HYPERTROPHY", 
    image: "/images/coaches/coach_alexander_portrait_1773814324341.png",
    className: "aspect-[4/5]",
    bio: "Alexander brings over 15 years of elite strength coaching experience. Formerly national team lifter himself, he fuses world-class Olympic protocols with targeted hypertrophy to rebuild posture, power, and performance."
  },
  { 
    name: "Elena Rossi", 
    specialty: "MOBILITY & CORRECTIVE MOVEMENT", 
    image: "/images/coaches/coach_elena_portrait_1773814342620.png",
    className: "aspect-square",
    bio: "Elena specializes in the eradication of chronic pain and the restoration of structural integrity. Using advanced biomechanical analysis, her protocols expand range of motion and fortify joints against future injury."
  },
  { 
    name: "Marcus Chen", 
    specialty: "METABOLIC CONDITIONING & HIIT", 
    image: "/images/coaches/coach_marcus_portrait_1773814357965.png",
    className: "aspect-[4/3]",
    bio: "Marcus engineers high-intensity metabolic environments designed to maximize fat oxidation and cardiovascular density. His relentless approach is sought after by executives who require peak energy and mental clarity."
  },
  { 
    name: "Sienna Williams", 
    specialty: "DYNAMIC VINYASA & LONGEVITY", 
    image: "/images/coaches/coach_sienna_portrait_1773814374152.png",
    className: "aspect-square",
    bio: "Sienna’s dynamic vinyasa classes blur the line between spiritual centering and profound physical challenge. She develops cellular longevity and muscular endurance through intense, breath-anchored movement sequences."
  },
  { 
    name: "David Vance", 
    specialty: "POWERLIFTING & PERFORMANCE NUTRITION", 
    image: "/images/coaches/coach_david_portrait_1773814389538.png",
    className: "aspect-[4/5]",
    bio: "Combining elite powerlifting methodology with precise nutritional science, David architects true maximal strength. He programs meticulously for those looking to conquer fundamental lifts with safety and absolute power."
  },
  { 
    name: "Isobel Grant", 
    specialty: "PILATES & REHABILITATION", 
    image: "/images/coaches/coach_isobel_portrait_1773814407505.png",
    className: "aspect-square",
    bio: "Isobel bridges the gap between clinical rehabilitation and athletic readiness. Using the reformer and sophisticated mat protocols, she unearths deep core strength and realigns the body for optimal tension distribution."
  },
];

export function CoachDirectory() {
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);

  const handleCardClick = (coach: Coach) => {
    setSelectedCoach(coach);
  };

  const closeModal = () => {
    setSelectedCoach(null);
  };

  return (
    <>
      <section className="pb-32 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 gap-y-16">
        {/* Column 1 */}
        <div className="flex flex-col gap-16">
          <CoachCard coach={COACHES[0]} onClick={() => handleCardClick(COACHES[0])} />
          <CoachCard coach={COACHES[3]} onClick={() => handleCardClick(COACHES[3])} />
        </div>
        {/* Column 2 */}
        <div className="flex flex-col gap-16 md:pt-24">
          <CoachCard coach={COACHES[1]} onClick={() => handleCardClick(COACHES[1])} />
          <CoachCard coach={COACHES[4]} onClick={() => handleCardClick(COACHES[4])} />
        </div>
        {/* Column 3 */}
        <div className="flex flex-col gap-16">
          <CoachCard coach={COACHES[2]} onClick={() => handleCardClick(COACHES[2])} />
          <CoachCard coach={COACHES[5]} onClick={() => handleCardClick(COACHES[5])} />
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
