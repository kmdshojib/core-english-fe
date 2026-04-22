"use client";

import Link from "next/link";
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

interface TopicCardProps {
  title: string;
  icon?: React.ReactNode;
  variant?: "default" | "selectable";
  href?: string;
  onSelect?: (title: string, selected: boolean) => void;
}

const TopicCard: React.FC<TopicCardProps> = ({
  title,
  icon,
  variant = "default",
  href,
  onSelect,
}) => {
  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    if (variant !== "selectable") return;

    const newValue = !selected;
    setSelected(newValue);
    onSelect?.(title, newValue);
  };

  const content = (
    <div
      onClick={handleSelect}
      className={`group relative overflow-hidden rounded-2xl border p-6 shadow-sm transition-all duration-300
      ${
        variant === "selectable" && selected
          ? "border-primary bg-primary/10"
          : "border-border bg-card hover:shadow-md hover:border-foreground/20 hover:bg-card/95"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
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
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            {title}
          </h2>
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
