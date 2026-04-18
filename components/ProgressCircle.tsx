"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface ProgressCircleProps {
  value: number; // percentage (0–100)
  size?: number; // px
  strokeWidth?: number;
  showText?: boolean;
  text?: string;
  className?: string;
}

export function ProgressCircle({
  value,
  size = 80,
  strokeWidth = 4,
  showText = true,
  text,
  className,
}: ProgressCircleProps) {
  const normalizedValue = Math.min(100, Math.max(0, value));

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (normalizedValue / 100) * circumference;

  const center = size / 2;

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted"
        />

        {/* Progress circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />

        {/* Gradient */}
        <defs>
          <linearGradient
            id="progressGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center text */}
      {showText && (
        <div className="absolute text-center">
          <span className="text-xs font-semibold text-muted-foreground">
            {text ?? `${normalizedValue}%`}
          </span>
        </div>
      )}
    </div>
  );
}
