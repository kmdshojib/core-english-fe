"use client";

import Link from "next/link";
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

interface TopicCardProps {
  title: string;
  icon?: React.ReactNode;
  variant?: "default" | "selectable";
  href?: string;
  selected?: boolean;
  onSelect?: (title: string, selected: boolean) => void;
}

const TopicCard: React.FC<TopicCardProps> = ({
  title,
  icon,
  variant = "default",
  href,
  selected: selectedProp,
  onSelect,
}) => {
  const [internalSelected, setInternalSelected] = useState(false);
  const selected = selectedProp ?? internalSelected;

  const handleSelect = () => {
    if (variant !== "selectable") return;

    const newValue = !selected;
    if (selectedProp === undefined) {
      setInternalSelected(newValue);
    }
    onSelect?.(title, newValue);
  };

  const content = (
    <div
      onClick={handleSelect}
      className={`group relative overflow-hidden rounded-[1.75rem] border p-5 shadow-sm transition-all duration-300
      ${
        variant === "selectable" && selected
          ? "border-primary/60 bg-primary/10 shadow-[0_18px_40px_-30px_rgba(14,165,233,0.55)]"
          : "border-border/80 bg-card hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-card/95 hover:shadow-lg"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center gap-3">
          {/* Checkbox (only for selectable) */}
          {variant === "selectable" && (
            <input
              name="input"
              type="checkbox"
              checked={selected}
              onChange={handleSelect}
              onClick={(e) => e.stopPropagation()}
              aria-label={`Select ${title}`}
              title={`Select ${title}`}
              className="h-5 w-5 cursor-pointer accent-primary"
            />
          )}

          {/* Icon */}
          {icon && (
            <div className="text-foreground/70 group-hover:text-foreground transition-colors">
              {icon}
            </div>
          )}

          {/* Title */}
          <div className="space-y-1">
            <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              {title}
            </h2>
            {variant === "selectable" && (
              <p className="text-sm text-muted-foreground">
                {selected ? "Selected for this mock" : "Tap to add this topic"}
              </p>
            )}
          </div>
        </div>

        {/* Arrow only for default */}
        {variant === "default" && (
          <ArrowRight className="h-5 w-5 text-foreground/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground" />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-5" />
    </div>
  );

  if (variant === "default" && href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
};

export default TopicCard;
