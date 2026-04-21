"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface ActionCardProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  color?: "indigo" | "violet" | "emerald" | "amber" | "rose";
}

export function ActionCard({
  href,
  icon,
  label,
  color = "indigo",
}: ActionCardProps) {
  const colorStyles = {
    indigo: {
      border: "hover:border-indigo-500/35",
      bg: "bg-indigo-500/10 group-hover:bg-indigo-500/20",
      glow: "group-hover:shadow-indigo-500/10",
    },
    violet: {
      border: "hover:border-violet-500/35",
      bg: "bg-violet-500/10 group-hover:bg-violet-500/20",
      glow: "group-hover:shadow-violet-500/10",
    },
    emerald: {
      border: "hover:border-emerald-500/35",
      bg: "bg-emerald-500/10 group-hover:bg-emerald-500/20",
      glow: "group-hover:shadow-emerald-500/10",
    },
    amber: {
      border: "hover:border-amber-500/35",
      bg: "bg-amber-500/10 group-hover:bg-amber-500/20",
      glow: "group-hover:shadow-amber-500/10",
    },
    rose: {
      border: "hover:border-rose-500/35",
      bg: "bg-rose-500/10 group-hover:bg-rose-500/20",
      glow: "group-hover:shadow-rose-500/10",
    },
  };

  const styles = colorStyles[color];

  return (
    <Link href={href} className="block h-full">
      <div
        className={cn(
          "group flex h-full min-h-24 w-full items-center rounded-2xl border border-border/80 bg-card/95 px-3 py-2 text-card-foreground shadow-sm transition-all duration-300 active:scale-[0.98] hover:-translate-y-0.5 hover:bg-muted/30 hover:shadow-lg sm:min-h-28 sm:rounded-3xl sm:p-4",
          styles.border,
          styles.glow,
        )}
      >
        <div className="flex w-full items-center gap-3 sm:gap-4">
          <div
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors sm:size-14 sm:rounded-2xl",
              styles.bg,
            )}
          >
            {icon}
          </div>

          <p className="line-clamp-2 text-sm font-semibold leading-snug text-foreground sm:text-base">
            {label}
          </p>
        </div>
      </div>
    </Link>
  );
}
