import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const BackButton = ({
  onPress,
  className,
}: {
  onPress: () => void;
  className?: string;
}) => {
  return (
    <div className={cn("my-4", className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={onPress}
        className="group -ml-2 gap-2 text-foreground/70 transition-colors hover:text-foreground hover:bg-foreground/5"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        <span className="text-sm font-medium">Back</span>
      </Button>
    </div>
  );
};

export default BackButton;
