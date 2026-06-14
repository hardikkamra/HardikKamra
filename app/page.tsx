'use client';

import { CinematicHero } from '@/components/ui/cinematic-landing-hero';
import { CinematicFooter } from '@/components/ui/motion-footer';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { CVDashboard } from '@/components/ui/cv-dashboard';
import { Topbar } from '@/components/ui/topbar';
import { BentoGrid } from '@/components/ui/bento-grid';
import { TableProperties, BarChart3, Database, Network, ShieldCheck, GraduationCap } from "lucide-react";

const skillsItems = [
  {
    title: "GST & TDS: Zero-Penalty Track Record",
    meta: "Statutory Compliance",
    description: "End-to-end GST reconciliation, TDS computation, and 100% deadline adherence across 5+ years — zero penalties ever filed.",
    icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    status: "Expert",
    tags: ["GST", "TDS"],
    colSpan: 2,
    hasPersistentHover: true
  },
  {
    title: "Tally Prime & ERP Systems",
    meta: "Accounting Software",
    description: "Full-cycle AP/AR management, bank reconciliation, payroll, and month-end closing in Tally Prime, Tally ERP 9, and Busy 2.1.",
    icon: <Network className="w-5 h-5 text-blue-400" />,
    status: "Advanced",
    tags: ["Tally Prime", "ERP"]
  },
  {
    title: "Advanced MS Excel",
    meta: "Data & Reporting",
    description: "Expense sheets, aging analysis, asset registers, and financial models — 20% faster report generation through workflow automation.",
    icon: <TableProperties className="w-5 h-5 text-purple-400" />,
    status: "Advanced",
    tags: ["Excel", "Automation"]
  },
  {
    title: "Cash Flow & AR Optimization",
    meta: "Financial Management",
    description: "Achieved 10% improvement in monthly cash inflow by optimizing receivables aging analysis and structured collection follow-up.",
    icon: <BarChart3 className="w-5 h-5 text-indigo-400" />,
    status: "Proven",
    tags: ["Cash Flow", "Receivables"],
    colSpan: 2
  },
  {
    title: "High-Volume Invoice Processing",
    meta: "Accounts Payable/Receivable",
    description: "Processed invoices for 100+ clients with 99% accuracy — managed full AP/AR cycles for 50+ vendors with timely disbursements.",
    icon: <Database className="w-5 h-5 text-amber-400" />,
    status: "Expert",
    tags: ["Invoicing", "AP/AR"],
    colSpan: 2
  },
  {
    title: "Academic & Certified Foundation",
    meta: "Education",
    description: "BSc General (IGNOU) · Diploma in Computer Applications · Accounting & Stock Management Certified · LinkedIn Learning Accounting.",
    icon: <GraduationCap className="w-5 h-5 text-rose-400" />,
    status: "Certified",
    tags: ["BSc", "Certifications"]
  }
];

export default function Home() {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-black">
      <div className="absolute top-0 inset-x-0 z-50">
        <Topbar />
      </div>

      {/* ── SECTION 1: CINEMATIC HERO ────────────────────────────────────────── */}
      <div id="home">
        <CinematicHero
          brandName="HK."
          tagline1="Compliance that protects,"
          tagline2="numbers that grow."
        />
      </div>

      {/* ── SECTION 2: MAIN SITE (z-50 sits above footer and hero) ────────────────────── */}
      <main id="work" className="relative z-50 w-full bg-transparent pb-10 md:pb-16">
        <div className="flex flex-col">
          <ContainerScroll    
            titleComponent={
              <>
                <div className="flex flex-col items-center justify-center mb-8">
                  <span className="text-sm md:text-base text-zinc-400 uppercase tracking-[0.3em] font-bold mb-3 drop-shadow-md">
                    My
                  </span>
                  <h1 className="text-5xl md:text-[6rem] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 drop-shadow-2xl text-center">
                    Career Dashboard
                  </h1>
                </div>
              </>
            }
          >
            <div className="h-full w-full overflow-hidden rounded-2xl bg-[#0a0a0c]">
              <CVDashboard />
            </div>
          </ContainerScroll>
        </div>

        {/* ── SECTION 3: EXPLORE MY WORK (CTA & SKILLS) ────────────────────────── */}
        <div id="skills" className="flex flex-col items-center justify-center text-center w-full px-4 mb-4 relative z-10 pt-10">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 drop-shadow-sm">
            Explore my work.
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl font-medium tracking-wide max-w-lg mx-auto text-center mb-16">
            Let&apos;s build compliant, data-driven finance systems together.
          </p>

          <div className="w-full max-w-7xl mx-auto">
            <BentoGrid items={skillsItems} />
          </div>
        </div>

      </main>

      {/* ── CINEMATIC FOOTER ──────────────────────────────────────────────────── */}
      <div id="contact" className="relative z-0">
        <CinematicFooter />
      </div>

    </div>
  );
}
