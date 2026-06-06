"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence, animate } from "framer-motion";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  /* Environment Overlays */
  .film-grain {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 50; opacity: 0.05; mix-blend-mode: overlay;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .bg-grid-theme {
      background-size: 60px 60px;
      background-image: 
          linear-gradient(to right, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px),
          linear-gradient(to bottom, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  /* -------------------------------------------------------------------
     PHYSICAL SKEUOMORPHIC MATERIALS (Restored 3D Depth)
  ---------------------------------------------------------------------- */
  
  /* OUTSIDE THE CARD: Theme-aware text (Shadow in Light Mode, Glow in Dark Mode) */
  .text-3d-matte {
      color: var(--color-foreground);
      text-shadow: 
          0 10px 30px color-mix(in srgb, var(--color-foreground) 20%, transparent), 
          0 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent);
  }

  .text-silver-matte {
      background: linear-gradient(180deg, var(--color-foreground) 0%, color-mix(in srgb, var(--color-foreground) 40%, transparent) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0); /* Hardware acceleration to prevent WebKit clipping bug */
      filter: 
          drop-shadow(0px 10px 20px color-mix(in srgb, var(--color-foreground) 15%, transparent)) 
          drop-shadow(0px 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent));
  }

  /* INSIDE THE CARD: Hardcoded Silver/White for the dark background, deep rich shadows */
  .text-card-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter: 
          drop-shadow(0px 12px 24px rgba(0,0,0,0.8)) 
          drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
  }

  /* Deep Physical Card with Dynamic Mouse Lighting */
  .premium-depth-card {
      background: linear-gradient(145deg, #18181b 0%, #09090b 100%);
      box-shadow: 
          0 40px 100px -20px rgba(0, 0, 0, 0.9),
          0 20px 40px -20px rgba(0, 0, 0, 0.8),
          inset 0 1px 2px rgba(255, 255, 255, 0.05),
          inset 0 -2px 4px rgba(0, 0, 0, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.04);
      position: relative;
  }

  .card-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
      background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06) 0%, transparent 40%);
      mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  /* Realistic iPhone Mockup Hardware */
  .iphone-bezel {
      background-color: #111;
      box-shadow: 
          inset 0 0 0 2px #52525B, 
          inset 0 0 0 7px #000, 
          0 40px 80px -15px rgba(0,0,0,0.9),
          0 15px 25px -5px rgba(0,0,0,0.7);
      transform-style: preserve-3d;
  }

  .hardware-btn {
      background: linear-gradient(90deg, #404040 0%, #171717 100%);
      box-shadow: 
          -2px 0 5px rgba(0,0,0,0.8),
          inset -1px 0 1px rgba(255,255,255,0.15),
          inset 1px 0 2px rgba(0,0,0,0.8);
      border-left: 1px solid rgba(255,255,255,0.05);
  }
  
  .screen-glare {
      background: linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%);
  }

  .widget-depth {
      background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
      box-shadow: 
          0 10px 20px rgba(0,0,0,0.3),
          inset 0 1px 1px rgba(255,255,255,0.05),
          inset 0 -1px 1px rgba(0,0,0,0.5);
      border: 1px solid rgba(255,255,255,0.03);
  }

  .floating-ui-badge {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 100%);
      backdrop-filter: blur(24px); 
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 
          0 0 0 1px rgba(255, 255, 255, 0.05),
          0 25px 50px -12px rgba(0, 0, 0, 0.8),
          inset 0 1px 1px rgba(255,255,255,0.1),
          inset 0 -1px 1px rgba(0,0,0,0.5);
  }

  .progress-ring {
      transform: rotate(-90deg);
      transform-origin: center;
      stroke-dasharray: 402;
      stroke-dashoffset: 402;
      stroke-linecap: round;
  }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
}

export function CinematicHero({
  brandName = "Riddhi-tg.",
  tagline1 = "Data that speaks",
  tagline2 = "shape your future.",
  cardHeading = "Finance & Data Architecture.",
  cardDescription,
  metricValue = 50,
  metricLabel = "Projects",
  className,
  ...props
}: CinematicHeroProps) {

  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  // Storytelling State
  const [currentStep, setCurrentStep] = useState(0);
  const currentStepRef = useRef(0);
  const [hasRevealed, setHasRevealed] = useState(false);
  const hasRevealedRef = useRef(false);

  const [displayValue, setDisplayValue] = useState(0);
  const valueRef = useRef(0);

  const storySteps = [
    {
      heading: "Finance & Data Architecture.",
      description: "Bridging the gap between raw data and actionable financial insights with robust models and interactive dashboards.",
      metricValue: 50,
      metricLabel: "Projects",
      badge1Title: "Level Up",
      badge1Subtitle: "Goal reached",
      badge1Icon: "📈",
      badge2Title: "Sync Data",
      badge2Subtitle: "Shared successfully",
      badge2Icon: "⚡",
    },
    {
      heading: "Power BI Dashboards.",
      description: "Turning raw numbers into visual narratives. Building interactive dashboards, utilizing DAX formulas, and creating automated KPI reports.",
      metricValue: 85,
      metricLabel: "Visuals",
      badge1Title: "Data Linked",
      badge1Subtitle: "Real-time sync",
      badge1Icon: "🔗",
      badge2Title: "Insights",
      badge2Subtitle: "Generated",
      badge2Icon: "💡",
    },
    {
      heading: "SQL & Data Analysis.",
      description: "Asking the right questions of structured databases. Using complex queries, JOINs, and aggregations to extract precise financial insights.",
      metricValue: 120,
      metricLabel: "Queries",
      badge1Title: "Optimized",
      badge1Subtitle: "0.2s runtime",
      badge1Icon: "⚡",
      badge2Title: "Exported",
      badge2Subtitle: "To Excel",
      badge2Icon: "📊",
    },
    {
      heading: "CMA US Journey.",
      description: "Currently pursuing CMA US and mastering SAP fundamentals—the backbone of enterprise financial planning, analysis, and control.",
      metricValue: 90,
      metricLabel: "Accuracy",
      badge1Title: "Certified",
      badge1Subtitle: "In Progress",
      badge1Icon: "🎓",
      badge2Title: "SAP ERP",
      badge2Subtitle: "Connected",
      badge2Icon: "🌐",
    },
    {
      heading: "Projects & Growth.",
      description: "Constantly building, learning, and collaborating. Eager to bring my data manipulation and financial modeling skills to a fast-paced internship.",
      metricValue: 100,
      metricLabel: "Growth %",
      badge1Title: "Open",
      badge1Subtitle: "For roles",
      badge1Icon: "💼",
      badge2Title: "Resume",
      badge2Subtitle: "Available",
      badge2Icon: "📄",
    }
  ];

  useEffect(() => {
    if (!hasRevealed) return;
    const controls = animate(valueRef.current, storySteps[currentStep].metricValue, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (val) => {
        valueRef.current = val;
        setDisplayValue(Math.round(val));
      },
    });
    return () => controls.stop();
  }, [currentStep, hasRevealed]);

  // 1. High-Performance Mouse Interaction Logic (Using requestAnimationFrame)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;

      cancelAnimationFrame(requestRef.current);

      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;

          mainCardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);

          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;

          gsap.to(mockupRef.current, {
            rotationY: xVal * 12,
            rotationX: -yVal * 12,
            ease: "power3.out",
            duration: 1.2,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // 2. Complex Cinematic Scroll Timeline
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"], { autoAlpha: 0 });

      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to(".text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".text-days", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1800", // Fast, snappy scroll distance
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;

            // Trigger the initial numbers reveal early in the setup phase
            if (p > 0.05 && !hasRevealedRef.current) {
              setHasRevealed(true);
              hasRevealedRef.current = true;
            }

            // Map progress 0.15 -> 0.85 to our 5 steps (the storytelling pause phase)
            let step = 0;
            if (p > 0.15 && p < 0.85) {
              const mapped = (p - 0.15) / 0.70;
              step = Math.min(4, Math.max(0, Math.floor(mapped * 5)));
            } else if (p >= 0.85) {
              step = 4;
            }

            if (step !== currentStepRef.current) {
              setCurrentStep(step);
              currentStepRef.current = step;
            }
          }
        },
      });

      scrollTl
        // 1. SETUP PHASE (Extremely fast in timeline time so it happens with little scrolling)
        .to([".hero-text-wrapper", ".bg-grid-theme"], { scale: 1.15, filter: "blur(20px)", opacity: 0, ease: "power2.inOut", duration: 0.5 }, 0)
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 0.5 }, 0)
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 0.4 })

        // Gorgeous 3D fly-in for the widgets
        .fromTo(".mockup-scroll-wrapper",
          { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 0.6 }, "-=0.2"
        )
        .fromTo(".phone-widget", { y: 40, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.05, ease: "back.out(1.2)", duration: 0.4 }, "-=0.3")
        .fromTo(".floating-badge", { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 0.4, stagger: 0.1 }, "-=0.4")
        .fromTo(".card-left-text", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 0.4 }, "-=0.4")
        .fromTo(".card-right-text", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 0.4 }, "<")

        // 2. STORYTELLING PAUSE (Massive duration so the user spends most of their scroll here)
        .to({}, { duration: 10.0 })

        // 3. EXIT PHASE (3D Pop In to match the Budget Tracker)
        .to(".main-card", {
          scale: 0.9,
          borderRadius: isMobile ? "32px" : "40px",
          rotationX: -15,
          y: -50,
          opacity: 0,
          ease: "power2.inOut",
          duration: 0.8
        })
        .to(".hero-fade-out-overlay", {
          opacity: 1,
          ease: "power2.inOut",
          duration: 0.8
        }, "<")
        .to([".mockup-scroll-wrapper", ".floating-badge", ".card-left-text", ".card-right-text", ".hero-text-wrapper", ".bg-grid-theme"], {
          opacity: 0,
          scale: 0.9,
          ease: "power2.inOut",
          duration: 0.6
        }, "<");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-screen bg-gradient-to-b from-black via-zinc-900/40 to-black overflow-hidden flex items-center justify-center", className)}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_100%)] pointer-events-none" />
      
      {/* Black overlay that fades in at the very end to seamlessly transition to the next black section */}
      <div className="hero-fade-out-overlay absolute inset-0 z-20 bg-black opacity-0 pointer-events-none" />

      {/* BACKGROUND LAYER: Hero Texts */}
      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 will-change-transform transform-style-3d">
        <h1 className="text-track gsap-reveal text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 text-4xl md:text-5xl lg:text-[5.5rem] font-bold tracking-tight mb-2 drop-shadow-lg">
          {tagline1}
        </h1>
        <h1 className="text-days gsap-reveal text-transparent bg-clip-text bg-gradient-to-b from-white/90 to-zinc-500 text-4xl md:text-5xl lg:text-[5.5rem] font-extrabold tracking-tighter drop-shadow-xl">
          {tagline2}
        </h1>
      </div>

      {/* BACKGROUND LAYER 1: Subtle Animated Grid (Fades out quickly) */}
      <div className="absolute inset-0 z-0 bg-grid-theme opacity-30 pointer-events-none" />

      {/* FOREGROUND LAYER: The Physical Deep Blue Card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          {/* DYNAMIC RESPONSIVE GRID: Flex-col on mobile to force order, Grid on desktop */}
          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">

            {/* 1. TOP (Mobile) / RIGHT (Desktop): BRAND NAME */}
            <div className="card-right-text gsap-reveal order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full">
              <h2 className="text-5xl md:text-[5rem] lg:text-[6rem] font-black uppercase tracking-tighter text-card-silver-matte lg:mt-0 opacity-40">
                {brandName}
              </h2>
            </div>

            {/* 2. MIDDLE (Mobile) / CENTER (Desktop): DATA WIDGET */}
            <div className="mockup-scroll-wrapper order-2 lg:order-2 relative w-full h-[380px] lg:h-[600px] flex items-center justify-center z-10" style={{ perspective: "1000px" }}>

              {/* Inner wrapper for safe CSS scaling */}
              <div className="relative w-full h-full flex items-center justify-center transform scale-[0.65] md:scale-[0.85] lg:scale-100">

                {/* Clean Dashboard Widget Container */}
                <div
                  ref={mockupRef}
                  className="relative w-[340px] h-[480px] rounded-[2.5rem] flex flex-col will-change-transform transform-style-3d border border-white/5 bg-[#050508] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.9)]"
                >
                  <div className="absolute inset-0 screen-glare z-40 pointer-events-none rounded-[2.5rem]" aria-hidden="true" />

                  {/* App Interface */}
                  <div className="relative w-full h-full pt-10 px-6 pb-8 flex flex-col z-10">
                    <div className="phone-widget flex justify-between items-center mb-10">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-1">Metrics</span>
                        <span className="text-xl font-bold tracking-tight text-white drop-shadow-md">Overview</span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/5 text-neutral-300 flex items-center justify-center font-bold text-sm border border-white/5 shadow-lg shadow-black/50">BS</div>
                    </div>

                    <div className="phone-widget relative w-48 h-48 mx-auto flex items-center justify-center mb-10 drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]">
                      <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                        <circle cx="96" cy="96" r="76" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="16" />
                        <motion.circle
                          className="progress-ring"
                          cx="96" cy="96" r="76" fill="none" stroke="#FFFFFF" strokeWidth="16"
                          strokeDasharray="477"
                          animate={{ strokeDashoffset: hasRevealed ? 477 - (477 * (storySteps[currentStep].metricValue / 150)) : 477 }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                      </svg>
                      <div className="text-center z-10 flex flex-col items-center">
                        <span className="counter-val text-5xl font-extrabold tracking-tighter text-white">{displayValue}</span>
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={currentStep}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.3 }}
                            className="text-[10px] text-neutral-500 uppercase tracking-[0.1em] font-bold mt-1 block"
                          >
                            {storySteps[currentStep].metricLabel}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="phone-widget widget-depth rounded-2xl p-4 flex items-center">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mr-4 border border-white/5 shadow-inner">
                          <svg className="w-4 h-4 text-neutral-300 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="h-2 w-24 bg-neutral-600 rounded-full mb-2 shadow-inner" />
                          <div className="h-1.5 w-16 bg-neutral-800 rounded-full shadow-inner" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Glass Badges */}
                <div className="floating-badge absolute flex top-6 lg:top-12 left-[-15px] lg:left-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30 min-w-[160px] lg:min-w-[190px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                      className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/5 shadow-inner flex-shrink-0"
                    >
                      <span className="text-base lg:text-xl drop-shadow-lg" aria-hidden="true">{storySteps[currentStep].badge1Icon}</span>
                    </motion.div>
                  </AnimatePresence>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 5 }}
                      transition={{ duration: 0.15 }}
                      className="flex-1"
                    >
                      <p className="text-white text-xs lg:text-sm font-bold tracking-tight whitespace-nowrap">{storySteps[currentStep].badge1Title}</p>
                      <p className="text-neutral-500 text-[10px] lg:text-xs font-medium whitespace-nowrap">{storySteps[currentStep].badge1Subtitle}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="floating-badge absolute flex bottom-12 lg:bottom-20 right-[-15px] lg:right-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30 min-w-[160px] lg:min-w-[190px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                      className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/5 shadow-inner flex-shrink-0"
                    >
                      <span className="text-base lg:text-lg drop-shadow-lg" aria-hidden="true">{storySteps[currentStep].badge2Icon}</span>
                    </motion.div>
                  </AnimatePresence>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -5 }}
                      transition={{ duration: 0.15 }}
                      className="flex-1"
                    >
                      <p className="text-white text-xs lg:text-sm font-bold tracking-tight whitespace-nowrap">{storySteps[currentStep].badge2Title}</p>
                      <p className="text-neutral-500 text-[10px] lg:text-xs font-medium whitespace-nowrap">{storySteps[currentStep].badge2Subtitle}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>

              </div>
            </div>

            {/* 3. BOTTOM (Mobile) / LEFT (Desktop): ACCOUNTABILITY TEXT */}
            <div className="card-left-text gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full lg:max-w-none px-4 lg:px-0 h-[220px] lg:h-[300px] relative overflow-hidden lg:overflow-visible">
              <AnimatePresence>
                <motion.div
                  key={currentStep}
                  className="absolute inset-0 flex flex-col justify-center"
                  initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -15, filter: "blur(6px)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <h3 className="text-white text-3xl md:text-4xl lg:text-[2.5rem] font-bold mb-4 lg:mb-6 tracking-tight leading-tight">
                    {storySteps[currentStep].heading}
                  </h3>
                  <p className="text-blue-100/70 text-sm md:text-base lg:text-lg font-light leading-relaxed mx-auto lg:mx-0 max-w-sm lg:max-w-none">
                    {storySteps[currentStep].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
