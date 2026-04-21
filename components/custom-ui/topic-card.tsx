import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";

interface TopicCardProps {
  title: string;
}

const TopicCard: React.FC<TopicCardProps> = ({ title }) => {
  return (
    <Link href={`/reading/topic/${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-foreground/20 hover:bg-card/95">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-foreground">
              {title}
            </h2>
          </div>
          <ArrowRight className="h-5 w-5 text-foreground/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-5" />
      </div>
    </Link>
  );
};

export default TopicCard;
