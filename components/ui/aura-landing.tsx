'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Menu } from 'lucide-react';

const AppleLogo = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 384 512" fill="currentColor" className={className}>
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
  </svg>
);

const LogoMark = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 256 256" fill="currentColor" className={className}>
    <path d="M 0 128 C 70.692 128 128 185.308 128 256 L 64 256 C 64 220.654 35.346 192 0 192 Z M 256 192 C 220.654 192 192 220.654 192 256 L 128 256 C 128 185.308 185.308 128 256 128 Z M 128 0 C 128 70.692 70.692 128 0 128 L 0 64 C 35.346 64 64 35.346 64 0 Z M 192 0 C 192 35.346 220.654 64 256 64 L 256 128 C 185.308 128 128 70.692 128 0 Z"/>
  </svg>
);

const AppleButton = ({ label = "Download", full = false }: { label?: string; full?: boolean }) => (
  <button className={`group inline-flex items-center justify-center gap-2 rounded-full bg-white text-black font-medium text-sm px-5 py-3 transition-all hover:bg-white/90 active:scale-[0.98] ${full ? 'w-full' : ''}`}>
    <AppleLogo />
    {label}
    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
  </button>
);

export function AuraLanding() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center overflow-hidden bg-[#0c0c0c] text-white z-20 pb-20">
      {/* Global Background Video */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-luminosity">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover pointer-events-none grayscale"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4" 
        />
      </div>

      <div className="hidden md:block pointer-events-none absolute inset-y-0 left-1/2 -translate-x-[calc(50%+36rem)] w-px bg-white/10 z-[5]" />
      <div className="hidden md:block pointer-events-none absolute inset-y-0 left-1/2 translate-x-[calc(-50%+36rem)] w-px bg-white/10 z-[5]" />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shiny {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-shiny {
          animation: shiny 6s linear infinite;
        }
      `}} />

      <svg className="hidden">
        <filter id="c3-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0" />
          <feComposite in2="SourceGraphic" operator="in" result="noise" />
          <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
        </filter>
      </svg>

      {/* SECTION 1 - Navbar */}
      <motion.nav 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <LogoMark className="w-8 h-8 text-white" />
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {['Solutions', 'Pricing', 'Blog', 'Documentation', 'Careers'].map((link, i) => (
            <motion.a 
              key={link}
              href="#"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + (i * 0.05), duration: 0.5 }}
              className="text-white/70 text-sm font-medium hover:text-white transition-colors"
            >
              {link}
            </motion.a>
          ))}
        </div>

        <div className="hidden md:block">
          <AppleButton label="Contact Me" />
        </div>
        
        <button className="md:hidden w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
          <Menu className="w-5 h-5 text-white" />
        </button>
      </motion.nav>

      {/* SECTION 2 - Hero */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center pt-16 md:pt-28 pb-20 text-center w-full max-w-4xl mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-[5.5rem] lg:text-[7rem] font-semibold tracking-tight leading-[0.9] flex flex-col items-center"
        >
          <span className="text-white">Vidhyashri.</span>
          <span 
            className="animate-shiny mt-4 md:mt-6 pb-2"
            style={{
              backgroundImage: 'linear-gradient(to right, #2a2a2a 0%, #6a6a6a 12.5%, #e5e5e5 32.5%, #ffffff 50%, #e5e5e5 67.5%, #6a6a6a 87.5%, #2a2a2a 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
              filter: 'url(#c3-noise)'
            }}
          >
            Data Architect
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 text-white/60 max-w-2xl mx-auto text-base md:text-xl leading-[1.5] font-light"
        >
          Bridging the gap between raw data and actionable financial insights with robust models and interactive dashboards.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <AppleButton label="Explore Projects" />
          <p className="text-xs text-white/40 font-medium tracking-wide uppercase">Available for New Projects</p>
        </motion.div>
      </section>

      {/* Smooth gradient fade to bottom */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
}
