import * as React from "react";
import { cn } from "@/lib/utils";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";
type ContainerElement = "div" | "main" | "section" | "article";

const sizeClasses: Record<ContainerSize, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-full",
};

type ContainerProps = React.HTMLAttributes<HTMLElement> & {
  as?: ContainerElement;
  size?: ContainerSize;
};

export function Container({
  as: Component = "div",
  className,
  size = "lg",
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
