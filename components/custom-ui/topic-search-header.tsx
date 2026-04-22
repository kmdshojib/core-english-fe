"use client";

import BackButton from "@/components/custom-ui/back-button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type TopicSearchHeaderProps = {
  onBack: () => void;
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
};

const TopicSearchHeader = ({
  onBack,
  value,
  onValueChange,
  placeholder = "Search topics...",
}: TopicSearchHeaderProps) => {
  return (
    <div className="my-4 flex flex-col gap-3 sm:flex-row sm:items-center">
      <BackButton onPress={onBack} className="my-0 shrink-0" />

      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          placeholder={placeholder}
          className="h-11 rounded-xl border border-border bg-card pl-10"
          aria-label="Search topics"
        />
      </div>
    </div>
  );
};

export default TopicSearchHeader;
