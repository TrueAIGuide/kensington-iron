"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

export type Coach = {
  id?: string;
  name: string;
  specialty: string;
  image: string;
  className: string;
  bio?: string;
};

type CoachModalProps = {
  coach: Coach | null;
  isOpen: boolean;
  onClose: () => void;
};

export function CoachModal({ coach, isOpen, onClose }: CoachModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && coach && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 z-[100] backdrop-blur-sm cursor-pointer"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-surface-container-lowest w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-sm flex flex-col md:flex-row pointer-events-auto border border-outline-variant/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full md:w-2/5 aspect-[4/5] relative bg-[#1A1A1A]">
                <Image
                  src={coach.image}
                  alt={coach.name}
                  fill
                  className="object-cover object-top grayscale"
                />
              </div>
              <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col relative">
                <button 
                  onClick={onClose}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center bg-surface-container hover:bg-surface-variant transition-colors text-on-surface"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 1L1 13M1 1l12 12" />
                  </svg>
                </button>
                
                <p className="font-body text-primary text-[10px] uppercase tracking-[0.2em] font-bold mb-4">
                  {coach.specialty}
                </p>
                <h3 className="font-display text-4xl md:text-5xl text-on-surface mb-8">
                  {coach.name}
                </h3>
                
                <div className="flex-grow space-y-6 font-body text-sm text-on-surface-variant leading-relaxed">
                  <p>
                    {coach.bio || `${coach.name} is a master in ${coach.specialty.toLowerCase()}, known for precision and science-based protocols. They have trained some of the world's most elite athletes, orchestrating high-performance breakthroughs in an environment of absolute discretion.`}
                  </p>
                  <p>
                    Their approach fuses anatomical rigor with progressive overload, ensuring that every session builds toward a measurable expansion of human capability.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
