"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function AnimatedHero() {
  return (
    <section className="relative h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 bg-surface z-0">
        <Image 
          src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2670&auto=format&fit=crop" 
          alt="Kensington Iron Interior"
          fill 
          priority
          unoptimized
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface/40" />
      </div>
      
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-start mt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={itemVariants} className="font-body text-primary text-[10px] md:text-sm font-bold tracking-[0.2em] uppercase mb-4">
          Mayfair • London
        </motion.p>
        <motion.h1 variants={itemVariants} className="font-display text-6xl md:text-8xl lg:text-[110px] tracking-tight leading-[0.9] text-on-surface mb-6">
          The Kinetic<br />
          <span className="text-primary italic pr-4">Sanctuary</span>
        </motion.h1>
        <motion.p variants={itemVariants} className="font-body text-lg md:text-xl text-on-surface-variant max-w-xl font-medium leading-relaxed mb-12">
          A private members club for the body and mind in Mayfair. Elevate your performance in an environment of absolute discretion.
        </motion.p>
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
          <Button href="/memberships" variant="primary" className="!px-10">Apply For Review</Button>
          <Button href="/facilities" variant="secondary" className="!px-10">Discover The Club</Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
