"use client";

import { cn } from "@/lib/utils";
import { GlowCard } from "@/components/ui/spotlight-card";

export interface BentoItem {
    title: string;
    description: string;
    icon: React.ReactNode;
    status?: string;
    tags?: string[];
    meta?: string;
    cta?: string;
    colSpan?: number;
    hasPersistentHover?: boolean;
}

interface BentoGridProps {
    items: BentoItem[];
}

function BentoGrid({ items }: BentoGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 max-w-7xl mx-auto">
            {items.map((item, index) => (
                <GlowCard
                    key={index}
                    customSize={true}
                    className={cn(
                        "group transition-all duration-300",
                        "bg-[#111111]/80 backdrop-blur-xl",
                        "hover:shadow-[0_8px_32px_rgba(255,255,255,0.03)]",
                        "hover:-translate-y-1 will-change-transform",
                        item.colSpan || "col-span-1",
                        item.colSpan === 2 ? "md:col-span-2" : "",
                        {
                            "shadow-[0_8px_32px_rgba(255,255,255,0.03)] -translate-y-1":
                                item.hasPersistentHover,
                        }
                    )}
                >
                    <div
                        className={cn(
                            "absolute inset-0 transition-opacity duration-300 pointer-events-none rounded-[2rem] overflow-hidden",
                            item.hasPersistentHover
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-100"
                        )}
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:4px_4px]" />
                    </div>

                    <div className="relative flex flex-col space-y-4 h-full justify-between z-10">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all duration-300">
                                    {item.icon}
                                </div>
                                {item.status && (
                                    <span
                                        className={cn(
                                            "text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm",
                                            "bg-white/5 text-white/70 border border-white/10",
                                            "transition-colors duration-300 group-hover:bg-white/10 group-hover:text-white"
                                        )}
                                    >
                                        {item.status}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-semibold text-white tracking-tight text-lg">
                                    {item.title}
                                    {item.meta && (
                                        <span className="ml-3 text-xs text-white/40 font-medium">
                                            {item.meta}
                                        </span>
                                    )}
                                </h3>
                                <p className="text-sm text-white/60 leading-relaxed font-light">
                                    {item.description}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                            <div className="flex items-center space-x-2 text-xs text-white/40">
                                {item.tags?.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="px-2.5 py-1 rounded-md bg-white/5 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:text-white/80"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                            <span className="text-xs font-semibold text-white/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                {item.cta || "Explore"} <span aria-hidden="true">&rarr;</span>
                            </span>
                        </div>
                    </div>

                    <div
                        className={cn(
                            "absolute inset-0 -z-10 rounded-[2rem] p-px bg-gradient-to-br from-white/10 via-white/5 to-transparent transition-opacity duration-300",
                            item.hasPersistentHover
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-100"
                        )}
                    />
                </GlowCard>
            ))}
        </div>
    );
}

export { BentoGrid };
