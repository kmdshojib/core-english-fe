"use client";

import { usePathname } from "next/navigation";
import { Home, BookOpen, ClipboardList, History, User } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "home", label: "হোম", icon: Home, href: "/" },
  {
    id: "questions",
    label: "প্রশ্নব্যাংক",
    icon: BookOpen,
    href: "/questions",
  },
  { id: "exam", label: "পরীক্ষা", icon: ClipboardList, href: "/exam" },
  { id: "history", label: "হিস্ট্রি", icon: History, href: "/history" },
  { id: "profile", label: "প্রোফেস্ট", icon: User, href: "/profile" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <>
      <nav className="app-bottom-nav fixed inset-x-0 bottom-0 z-40 px-2 pb-2 sm:px-4 sm:pb-4">
        <div className="mx-auto flex w-full max-w-xl items-center justify-around gap-1 rounded-[1.75rem] border border-border/70 bg-background/90 px-2 py-2 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:max-w-3xl sm:gap-2 sm:px-3">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "flex min-w-0 flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2 transition-all duration-300 sm:px-4",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                )}
              >
                <div
                  className={cn(
                    "rounded-xl p-2 transition-all duration-300",
                    isActive
                      ? "bg-primary/20 text-primary shadow-sm"
                      : "text-inherit",
                  )}
                >
                  <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <span
                  className={cn(
                    "line-clamp-1 text-center text-[11px] font-medium transition-colors sm:text-xs",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div aria-hidden="true" className="app-bottom-nav-spacer h-24 sm:h-28" />
    </>
  );
}
