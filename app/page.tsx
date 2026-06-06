'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CinematicHero } from '@/components/ui/cinematic-landing-hero';
import { CinematicFooter } from '@/components/ui/motion-footer';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { WebGLShader } from '@/components/ui/web-gl-shader';
import { Topbar } from '@/components/ui/topbar';
import { BentoGrid } from '@/components/ui/bento-grid';
import { TableProperties, BarChart3, Database, Network, ShieldCheck, GraduationCap } from "lucide-react";
import { cn } from '@/lib/utils';

const skillsItems = [
  {
    title: "Excel expertise, real-world ready",
    meta: "Data Manipulation",
    description: "Pivot tables, VLOOKUP/XLOOKUP, financial models, dashboards, data cleaning - built from practice.",
    icon: <TableProperties className="w-5 h-5 text-emerald-400" />,
    status: "Advanced",
    tags: ["Modeling", "Dashboards"],
    colSpan: 2,
    hasPersistentHover: true
  },
  {
    title: "Turning data into visual stories",
    meta: "Visual Analytics",
    description: "Interactive dashboards, DAX formulas, KPI reporting, business intelligence for finance.",
    icon: <BarChart3 className="w-5 h-5 text-blue-400" />,
    status: "Intermediate",
    tags: ["Power BI", "DAX"]
  },
  {
    title: "Ask the right questions of your data",
    meta: "Database Querying",
    description: "SELECT, JOIN, GROUP BY, subqueries - querying structured databases with precision and logic.",
    icon: <Database className="w-5 h-5 text-purple-400" />,
    status: "Learning",
    tags: ["SQL", "Querying"]
  },
  {
    title: "Enterprise-level finance systems",
    meta: "ERP Systems",
    description: "Learning SAP fundamentals - the backbone of corporate finance and accounting operations.",
    icon: <Network className="w-5 h-5 text-indigo-400" />,
    status: "Basics",
    tags: ["SAP", "ERP"],
    colSpan: 2
  },
  {
    title: "CMA US - Certified Management Acct.",
    meta: "Certification",
    description: "Pursuing CMA US - covering financial planning, analysis, control, and decision support.",
    icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
    status: "In Progress",
    tags: ["Finance", "Control"],
    colSpan: 2
  },
  {
    title: "Strong academic foundation",
    meta: "Education",
    description: "90% in Class XII · BCom (ongoing) · Jaipur. SKS scool alumnus.",
    icon: <GraduationCap className="w-5 h-5 text-rose-400" />,
    status: "Ongoing",
    tags: ["BCom", "Academics"]
  }
];

export default function Home() {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-black">
      <div className="absolute top-0 inset-x-0 z-50">
        <Topbar />
      </div>
      <WebGLShader />

      {/* ── SECTION 1: CINEMATIC HERO ────────────────────────────────────────── */}
      <div id="home">
        <CinematicHero
          brandName="Vidhyashri."
          tagline1="Data that speaks,"
          tagline2="louder than words."
          cardHeading="Finance & Data Architecture."
          cardDescription={
            <>
              <span className="text-white font-semibold">Bridging the gap</span> between raw data and actionable financial insights with robust models and interactive dashboards.
            </>
          }
          metricValue={50}
          metricLabel="Projects"
        />
      </div>

      {/* ── SECTION 2: MAIN SITE (z-10 sits above footer) ────────────────────── */}
      <main id="work" className="relative z-10 w-full bg-black pb-40 md:pb-64 rounded-b-[40px] shadow-2xl">
        <div className="flex flex-col pb-32 pt-4">
          <ContainerScroll    
            titleComponent={
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-10%" }}
                className="mb-8 inline-block text-center"
              >
                <h2 className="flex flex-col items-center">
                  <motion.span
                    variants={{
                      hidden: { scale: 0.5, opacity: 0, y: 20 },
                      visible: { scale: 1, opacity: 1, y: 0 }
                    }}
                    transition={{ type: "spring", stiffness: 250, damping: 15 }}
                    className="text-5xl md:text-[6rem] font-bold leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white/90 to-zinc-400 drop-shadow-sm block"
                  >
                    Financial
                  </motion.span>
                  <motion.span
                    variants={{
                      hidden: { scale: 0.5, opacity: 0, y: 20 },
                      visible: { scale: 1, opacity: 1, y: 0 }
                    }}
                    transition={{ type: "spring", stiffness: 250, damping: 15, delay: 0.1 }}
                    className="text-5xl md:text-[6rem] font-bold leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-zinc-300 to-zinc-600 drop-shadow-sm block -mt-2"
                  >
                    Budget Tracker
                  </motion.span>
                </h2>
              </motion.div>
            }
          >
            <img
              src="https://storage.efferd.com/screen/dashboard-dark.webp"
              alt="Enterprise Dashboard"
              className="mx-auto rounded-2xl object-cover h-full object-left-top opacity-90"
              draggable={false}
            />
          </ContainerScroll>
        </div>

        {/* ── SECTION 3: EXPLORE MY WORK (CTA & SKILLS) ────────────────────────── */}
        <div id="skills" className="flex flex-col items-center justify-center text-center w-full px-4 mb-16 relative z-10 pt-10">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 drop-shadow-sm">
            Explore my work.
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl font-medium tracking-wide max-w-lg mx-auto text-center mb-16">
            Let&apos;s build scalable financial systems together.
          </p>

          <div className="w-full max-w-7xl mx-auto">
            <BentoGrid items={skillsItems} />
          </div>
        </div>

      </main>

      {/* ── CINEMATIC FOOTER ──────────────────────────────────────────────────── */}
      <div id="contact" className="relative -mt-[40px] z-0">
        <CinematicFooter />
      </div>

    </div>
  );
}
