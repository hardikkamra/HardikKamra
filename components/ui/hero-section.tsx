import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowDownIcon, ArrowRightIcon, GraduationCap } from "lucide-react";

export function HeroSection() {
  return (
    <section className="mx-auto w-full max-w-5xl overflow-hidden pt-16">
      {/* Shades */}
      <div
        aria-hidden="true"
        className="absolute inset-0 size-full overflow-hidden"
      >
        <div
          className={cn(
            "absolute inset-0 isolate -z-10",
            "bg-[radial-gradient(20%_80%_at_20%_0%,rgba(255,255,255,0.1),transparent)]"
          )}
        />
      </div>
      <div className="relative z-10 flex w-full flex-col items-center text-center gap-6 px-4">
        <a
          className={cn(
            "group flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md",
            "fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards transition-all delay-500 duration-500 ease-out hover:bg-white/10"
          )}
          href="#link"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-500"></span>
            </span>
            <span className="text-xs font-medium tracking-wide text-white/80">Accepting select opportunities</span>
          </div>
        </a>

        <h1
          className={cn(
            "text-balance font-medium text-4xl text-foreground leading-tight md:text-5xl",
            "fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards delay-100 duration-500 ease-out"
          )}
        >
          Finance & <br />
          <span className="bg-gradient-to-r from-violet-400 to-blue-500 bg-clip-text text-transparent">Data Architecture.</span>
        </h1>

        <p
          className={cn(
            "text-muted-foreground text-sm tracking-wider sm:text-lg md:text-xl",
            "fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards delay-200 duration-500 ease-out"
          )}
        >
          Building intelligent systems and visual narratives.<br />
          Finance, data, and design.
        </p>

        <div className="fade-in slide-in-from-bottom-10 flex flex-wrap w-fit items-center justify-center gap-4 fill-mode-backwards pt-4 delay-300 duration-500 ease-out">
          <Button className="bg-white text-black hover:bg-white/90 rounded-full px-8 h-12 text-sm font-medium">
            Explore Work
          </Button>
          <Button variant="outline" className="rounded-full px-8 h-12 border-white/20 hover:bg-white/10 text-sm font-medium">
            Connect
          </Button>
        </div>
      </div>
    </section>
  );
}
