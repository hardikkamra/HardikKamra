'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Topbar } from '@/components/ui/topbar';
import { GLSLHills } from '@/components/ui/glsl-hills';

export function NewLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Scale down smoothly
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  // Increase border radius perfectly to match a curved card
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["0px", "48px"]);
  // Fade out slightly at the very end
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.4]);
  // Slight Y translation to stay aligned with the incoming card
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <div ref={containerRef} className="relative w-full h-[150vh] bg-black">
      {/* Sticky container that stays on screen while we scroll through the 150vh */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center perspective-[1000px]">
        
        {/* The transforming curved rectangle */}
        <motion.div 
          style={{ scale, borderRadius, opacity, y }}
          className="relative w-full h-full overflow-hidden bg-[#0c0c0c] shadow-[0_0_100px_rgba(0,0,0,0.5)] origin-center"
        >
          {/* Topbar Navigation */}
          <div className="absolute top-0 inset-x-0 z-50">
            <Topbar />
          </div>

          {/* GLSL Hills Background */}
          <GLSLHills />
          
          {/* Hero Text */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none space-y-6 text-center">
            <h1 className="font-semibold text-5xl md:text-7xl whitespace-pre-wrap text-white">
              <span className="italic text-4xl md:text-6xl font-thin text-white/80">Data That Speaks <br/> </span>
              Louder Than Words
            </h1>
            <p className="text-sm md:text-base text-white/60 max-w-lg mx-auto">
              Bridging the gap between raw data and actionable financial insights with robust models and interactive dashboards.
            </p>
          </div>

          {/* Subtle gradient overlay at bottom to blend */}
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
}
