"use client";
import {
  Target,
  BookOpen,
  SpellCheck,
  History,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { ActionCard } from "@/components/custom-ui/action-cart";
import { Container } from "@/components/container";

type ActionColor = "indigo" | "violet" | "emerald" | "amber" | "rose";

const actions = [
  {
    href: "/mock",
    label: "Mock Master",
    icon: Target,
    color: "indigo",
    iconColor: "text-indigo-400",
  },
  {
    href: "/reading",
    label: "Reading",
    icon: BookOpen,
    color: "violet",
    iconColor: "text-violet-400",
  },
  {
    href: "/vocab",
    label: "Vocab Booster",
    icon: SpellCheck,
    color: "emerald",
    iconColor: "text-emerald-400",
  },
  {
    href: "/previous",
    label: "Previous Year Question",
    icon: History,
    color: "amber",
    iconColor: "text-amber-400",
  },
  {
    href: "/expert",
    label: "Topic Expert",
    icon: GraduationCap,
    color: "rose",
    iconColor: "text-rose-400",
  },
] satisfies Array<{
  href: string;
  label: string;
  icon: LucideIcon;
  color: ActionColor;
  iconColor: string;
}>;

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <Container as="main" size="sm" className="py-8">
        <div className="grid w-full grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
          {actions.map((item, index) => {
            const Icon = item.icon;
            const isLastOddItem =
              actions.length % 2 !== 0 && index === actions.length - 1;

            return (
              <div
                key={item.href}
                className={isLastOddItem ? "col-span-2 md:col-span-1" : ""}
              >
                <ActionCard
                  href={item.href}
                  label={item.label}
                  color={item.color}
                  icon={
                    <Icon
                      size={18}
                      className={`sm:h-5 sm:w-5 ${item.iconColor}`}
                    />
                  }
                />
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
