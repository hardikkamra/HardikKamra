"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { ShaderAnimation } from "@/components/ui/shader-lines";
import { WebGLShader } from "@/components/ui/web-gl-shader";

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
      transform: translateZ(0);
      filter: 
          drop-shadow(0px 10px 20px color-mix(in srgb, var(--color-foreground) 15%, transparent)) 
          drop-shadow(0px 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent));
  }

  .text-glassy-metallic {
      background: linear-gradient(
          to right,
          #e0f2fe 0%,   /* light sky blue */
          #fdf4ff 25%,  /* light pink/fuchsia */
          #f1f5f9 50%,  /* silver/slate */
          #e0e7ff 75%,  /* light indigo */
          #e0f2fe 100%
      );
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      color: transparent;
      animation: shine-glass 8s linear infinite;
      -webkit-text-stroke: 0.5px rgba(255, 255, 255, 0.4);
      filter: drop-shadow(0 2px 8px rgba(255,255,255,0.1));
  }

  @keyframes shine-glass {
      to {
          background-position: 200% center;
      }
  }

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
      stroke-dasharray: 477;
      stroke-dashoffset: 477;
      stroke-linecap: round;
  }

  .text-glassy-metallic {
      background: linear-gradient(
          90deg, 
          rgba(255, 255, 180, 0.6) 0%, 
          rgba(150, 220, 255, 0.6) 50%, 
          rgba(230, 180, 255, 0.6) 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      -webkit-text-stroke: 1px rgba(255, 255, 255, 0.8);
      filter: drop-shadow(0px 4px 12px rgba(150, 220, 255, 0.2)) drop-shadow(0px 2px 4px rgba(0,0,0,0.5));
  }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
}

export function CinematicHero({
  brandName = "Cibi.",
  tagline1 = "Data that speaks",
  tagline2 = "shape your future.",
  className,
  ...props
}: CinematicHeroProps) {

  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  const summaryText = "Results-driven Finance Professional with 5+ years of progressive experience in end-to-end accounting, GST & TDS compliance, and financial reporting across the Telecom and Wellness sectors. Proven track record of improving process efficiency, maintaining a zero-penalty compliance record, and driving cash flow improvements through data-driven insights. Proficient in Tally Prime, Tally ERP 9, Busy 2.1, and Advanced MS Excel.";
  const summaryWords = summaryText.split(" ");

  const storySteps = [
    {
      heading: "5+ Years Experience.",
      description: "Progressive experience as an Account Executive at Alpha Net and Base39 Mobile Communication, managing full-cycle accounts payable and receivable.",
      metricValue: 5,
      metricLabel: "Years Exp.",
      badge1Title: "Alpha Net",
      badge1Subtitle: "Account Exec",
      badge1Icon: "🏢",
      badge2Title: "Base39",
      badge2Subtitle: "Accountant",
      badge2Icon: "📱",
    },
    {
      heading: "Cash Flow Improvement.",
      description: "10% improvement in monthly cash inflow by optimizing receivables aging analysis and structuring collection follow-up systems.",
      metricValue: 10,
      metricLabel: "Inflow Boost %",
      badge1Title: "DSO Reduced",
      badge1Subtitle: "Significantly",
      badge1Icon: "📈",
      badge2Title: "Collections",
      badge2Subtitle: "Structured",
      badge2Icon: "💰",
    },
    {
      heading: "Process Automation.",
      description: "Achieved a 20% reduction in report generation time through process automation and workflow redesign while ensuring 100% compliance.",
      metricValue: 20,
      metricLabel: "Time Saved %",
      badge1Title: "Automated",
      badge1Subtitle: "Workflows",
      badge1Icon: "⚡",
      badge2Title: "Reporting",
      badge2Subtitle: "Accelerated",
      badge2Icon: "📊",
    },
    {
      heading: "Invoice Accuracy.",
      description: "Created and managed invoices for 100+ clients. Processed high-volume daily invoices with near-zero discrepancy, maintaining 99% accuracy.",
      metricValue: 99,
      metricLabel: "Accuracy %",
      badge1Title: "High Volume",
      badge1Subtitle: "Processed",
      badge1Icon: "🧾",
      badge2Title: "Discrepancy",
      badge2Subtitle: "Near-Zero",
      badge2Icon: "🎯",
    },
    {
      heading: "GST & TDS Compliance.",
      description: "Zero-Penalty Record across all GST and TDS filings during entire career. Ensured 100% compliance with filing deadlines, eliminating penalty risk.",
      metricValue: 100,
      metricLabel: "Compliance %",
      badge1Title: "Zero Penalties",
      badge1Subtitle: "All filings",
      badge1Icon: "✅",
      badge2Title: "GST Filed",
      badge2Subtitle: "On time",
      badge2Icon: "📋",
    },
  ];

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

  // 2. Pure GSAP Cinematic Scroll Timeline
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // Reset all elements
      gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".card-right-text", ".mockup-scroll-wrapper", ".phone-widget", ".hero-summary-text", ".step-text", ".step-badge"], { autoAlpha: 0 });
      gsap.set(".hero-summary-text", { y: 30 });
      gsap.set(".next-section-title", { autoAlpha: 0 });

      // Initial Intro Animation
      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to(".text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".text-days", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0");

      // Main Scroll Timeline
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=12000", // Massively lengthened for ultimate smoothness
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        }
      });

      // 1. SETUP PHASE (Card flies in)
      scrollTl
        .to([".hero-text-wrapper", ".bg-grid-theme"], { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0)
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
        
        // Mockup 3D fly-in
        .fromTo(".mockup-scroll-wrapper",
          { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 }, "-=0.8"
        )
        // Widgets pop in
        .fromTo(".phone-widget", { y: 40, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.15, ease: "back.out(1.2)", duration: 1.5 }, "-=1.5")
        // Brand text fades in
        .fromTo(".card-right-text", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<");

      // 2. SEQUENTIAL STORYTELLING PHASE (Pure GSAP)
      storySteps.forEach((step, index) => {
        // Calculate stroke offset
        const strokeOffset = 477 - (477 * (step.metricValue / 100));

        if (index === 0) {
          // Entry of the first step
          scrollTl.to(".progress-ring", { strokeDashoffset: strokeOffset, duration: 2, ease: "power3.inOut" }, "-=1.2");
          scrollTl.to(".counter-val", { innerHTML: step.metricValue, snap: { innerHTML: 1 }, duration: 2, ease: "expo.out" }, "-=2.0");
          scrollTl.to(".metric-label-val", { innerHTML: step.metricLabel, duration: 0.1 }, "-=2.0");
          scrollTl.fromTo(`.step-badge-${index}`, { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 }, "-=2.0");
          scrollTl.fromTo(`.step-text-${index}`, { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5");
        } else {
          // Crossfade from previous step
          scrollTl.to([`.step-text-${index-1}`, `.step-badge-${index-1}`], { autoAlpha: 0, y: -40, duration: 1.2, stagger: 0.05 });
          
          scrollTl.to(".progress-ring", { strokeDashoffset: strokeOffset, duration: 2, ease: "power3.inOut" }, "<");
          scrollTl.to(".counter-val", { innerHTML: step.metricValue, snap: { innerHTML: 1 }, duration: 2, ease: "expo.out" }, "<");
          scrollTl.to(".metric-label-val", { innerHTML: step.metricLabel, duration: 0.1 }, "<");
          
          scrollTl.fromTo(`.step-badge-${index}`, { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 }, "<+=0.5");
          scrollTl.fromTo(`.step-text-${index}`, { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "<");
        }

        // Dwell time to read the step
        scrollTl.to({}, { duration: 3.5 });
      });

      // 3. EXIT PHASE
      scrollTl
        .to([".mockup-scroll-wrapper", `.step-badge-${storySteps.length - 1}`, `.step-text-${storySteps.length - 1}`, ".card-right-text"], {
          scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1.5, stagger: 0.05,
        })
        .to(".main-card", { 
          width: isMobile ? "92vw" : "85vw", 
          height: isMobile ? "92vh" : "85vh", 
          borderRadius: isMobile ? "32px" : "40px", 
          ease: "expo.inOut", 
          duration: 1.8 
        }, "pullback") 
        .to(".main-card", { y: -(window.innerHeight + 200), ease: "power3.inOut", duration: 1.5 })
        
        // Full section preview fades in as card exits
        .to(".next-section-title", { autoAlpha: 1, ease: "power2.out", duration: 0.8 }, "-=0.8")
        
        // Text distorts and warps out holographically instead of just zooming massively into clipping bounds
        .to(".hero-name-text", { 
            scale: 2.5, 
            scaleY: 1.5,
            skewX: 20,
            filter: "blur(15px)",
            autoAlpha: 0, 
            ease: "power2.inOut", 
            duration: 4.5 
        }, "+=0.2")

        // The background smoothly dissolves into pure black
        .to(".hero-fade-out-overlay", { autoAlpha: 1, ease: "power2.inOut", duration: 4.0 }, "<+=1.0")
        .to(".landing-shader-canvas-v2", { autoAlpha: 0, ease: "power2.inOut", duration: 4.0 }, "<")

        // Fade in summary text container
        .to(".hero-summary-text", { autoAlpha: 1, y: 0, ease: "power2.out", duration: 2.5 }, ">-2.0")
        
        // Typewriter effect on characters
        .to(".summary-char", { opacity: 1, stagger: 0.05, duration: 0.1, ease: "none" }, "<+=0.5")

        // Hold the summary text
        .to({}, { duration: 8.0 })

        // Warp/Distort Fade out
        .to(".hero-summary-text", { 
            autoAlpha: 0, 
            scaleY: 1.5, 
            scaleX: 0.8, 
            skewX: 10, 
            y: -40, 
            filter: "blur(15px)", 
            ease: "power3.in", 
            duration: 2.5 
        });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      style={{ perspective: "1000px" }}
      {...props}
    >
      <div className="absolute inset-0 z-0">
        <WebGLShader />
      </div>
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_100%)] pointer-events-none" />
      
      <div className="hero-fade-out-overlay absolute inset-0 z-[100] bg-black opacity-0 pointer-events-none" />

      {/* BACKGROUND LAYER: Hero Taglines */}
      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 will-change-transform transform-style-3d">
        <h1 className="text-track gsap-reveal text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 text-4xl md:text-5xl lg:text-[5.5rem] font-bold tracking-tight mb-2 drop-shadow-lg pb-2">
          {tagline1}
        </h1>
        <h1 className="text-days gsap-reveal text-transparent bg-clip-text bg-gradient-to-b from-white/90 to-zinc-500 text-4xl md:text-5xl lg:text-[5.5rem] font-extrabold tracking-tighter drop-shadow-xl pb-2">
          {tagline2}
        </h1>
      </div>

      {/* NEXT SECTION PREVIEW */}
      <div className="next-section-title absolute inset-0 z-10 flex flex-col items-center justify-center overflow-hidden w-full">
        <ShaderAnimation/>
        <span className="hero-name-text absolute pointer-events-none z-10 text-center text-[13vw] sm:text-[12vw] md:text-[10vw] lg:text-[9vw] xl:text-[8.5vw] leading-none font-semibold tracking-tighter whitespace-nowrap text-neutral-100 drop-shadow-2xl px-4">
          Hardik Kamra.
        </span>
      </div>

      <div className="hero-summary-text absolute inset-0 z-[110] flex flex-col items-center justify-center pointer-events-none opacity-0 translate-y-8">
        <div className="w-full max-w-[95vw] lg:max-w-[85vw] px-4 text-center">
          <p className="text-glassy-metallic text-2xl md:text-4xl lg:text-5xl font-medium leading-snug tracking-wide">
            {summaryWords.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-[0.3em]">
                {word.split("").map((char, charIndex) => (
                  <span key={charIndex} className="summary-char opacity-0 inline-block">
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="absolute inset-0 z-0 bg-grid-theme opacity-30 pointer-events-none" />

      {/* FOREGROUND LAYER: The Physical Deep Blue Card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          {/* DYNAMIC RESPONSIVE GRID */}
          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">

            {/* 1. TOP (Mobile) / RIGHT (Desktop): BRAND NAME */}
            <div className="card-right-text gsap-reveal order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full">
              <h2 className="text-5xl md:text-[5rem] lg:text-[6rem] font-black uppercase tracking-tighter text-card-silver-matte lg:mt-0 opacity-40">
                {brandName}
              </h2>
            </div>

            {/* 2. MIDDLE (Mobile) / CENTER (Desktop): DATA WIDGET */}
            <div className="mockup-scroll-wrapper order-2 lg:order-2 relative w-full h-[380px] lg:h-[600px] flex items-center justify-center z-10" style={{ perspective: "1000px" }}>
              <div className="relative w-full h-full flex items-center justify-center transform scale-[0.65] md:scale-[0.85] lg:scale-100">
                <div
                  ref={mockupRef}
                  className="relative w-[340px] h-[480px] rounded-[2.5rem] flex flex-col will-change-transform transform-style-3d border border-white/5 bg-[#050508] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.9)]"
                >
                  <div className="absolute inset-0 screen-glare z-40 pointer-events-none rounded-[2.5rem]" aria-hidden="true" />
                  <div className="relative w-full h-full pt-10 px-6 pb-8 flex flex-col z-10">
                    <div className="phone-widget flex justify-between items-center mb-10">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-1">Metrics</span>
                        <span className="text-xl font-bold tracking-tight text-white drop-shadow-md">Overview</span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/5 text-neutral-300 flex items-center justify-center font-bold text-sm border border-white/5 shadow-lg shadow-black/50">HK</div>
                    </div>

                    <div className="phone-widget relative w-48 h-48 mx-auto flex items-center justify-center mb-10 drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]">
                      <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                        <circle cx="96" cy="96" r="76" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="16" />
                        <circle className="progress-ring" cx="96" cy="96" r="76" fill="none" stroke="#FFFFFF" strokeWidth="16" style={{ strokeDashoffset: 477 }} />
                      </svg>
                      <div className="text-center z-10 flex flex-col items-center">
                        <span className="counter-val text-5xl font-extrabold tracking-tighter text-white">0</span>
                        <span className="metric-label-val text-[10px] text-neutral-500 uppercase tracking-[0.1em] font-bold mt-1 block">Value</span>
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

                {/* Floating Glass Badges mapped absolutely */}
                {storySteps.map((step, index) => (
                  <React.Fragment key={index}>
                    <div className={`step-badge step-badge-${index} absolute flex top-6 lg:top-12 left-[-15px] lg:left-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30 min-w-[160px] lg:min-w-[190px] opacity-0 invisible`}>
                      <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/5 shadow-inner flex-shrink-0">
                        <span className="text-base lg:text-xl drop-shadow-lg" aria-hidden="true">{step.badge1Icon}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-xs lg:text-sm font-bold tracking-tight whitespace-nowrap">{step.badge1Title}</p>
                        <p className="text-neutral-500 text-[10px] lg:text-xs font-medium whitespace-nowrap">{step.badge1Subtitle}</p>
                      </div>
                    </div>

                    <div className={`step-badge step-badge-${index} absolute flex bottom-12 lg:bottom-20 right-[-15px] lg:right-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30 min-w-[160px] lg:min-w-[190px] opacity-0 invisible`}>
                      <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/5 shadow-inner flex-shrink-0">
                        <span className="text-base lg:text-lg drop-shadow-lg" aria-hidden="true">{step.badge2Icon}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-xs lg:text-sm font-bold tracking-tight whitespace-nowrap">{step.badge2Title}</p>
                        <p className="text-neutral-500 text-[10px] lg:text-xs font-medium whitespace-nowrap">{step.badge2Subtitle}</p>
                      </div>
                    </div>
                  </React.Fragment>
                ))}

              </div>
            </div>

            {/* 3. BOTTOM (Mobile) / LEFT (Desktop): ACCOUNTABILITY TEXT */}
            <div className="order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full lg:max-w-none px-4 lg:px-0 h-[220px] lg:h-[300px] relative overflow-hidden lg:overflow-visible">
              {storySteps.map((step, index) => (
                <div key={index} className={`step-text step-text-${index} absolute inset-0 flex flex-col justify-center opacity-0 invisible`}>
                  <h3 className="text-white text-3xl md:text-4xl lg:text-[2.5rem] font-bold mb-4 lg:mb-6 tracking-tight leading-tight">
                    {step.heading}
                  </h3>
                  <p className="text-blue-100/70 text-sm md:text-base lg:text-lg font-light leading-relaxed mx-auto lg:mx-0 max-w-sm lg:max-w-none">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
