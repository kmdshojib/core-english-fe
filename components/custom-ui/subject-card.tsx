"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressCircle } from "./ProgressCircle";

interface SubjectCardProps {
  title: string;
  progress: {
    completed: number;
    total: number;
  };
  percentage: number;
  subtopics: number;
  questions: number;
  isFavorited?: boolean;
  onFavorite?: () => void;
  onAllQuestions?: () => void;
  onAllSubtopics?: () => void;
  onRandomQuiz?: () => void;
  secondaryText?: string;
}

export function SubjectCard({
  title,
  progress,
  percentage,
  subtopics,
  questions,
  isFavorited = false,
  onFavorite,
  onAllQuestions,
  onAllSubtopics,
  onRandomQuiz,
  secondaryText = "পড়া হয়েছে",
}: SubjectCardProps) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  return (
    <div className="w-full rounded-2xl border border-border bg-card p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header with title and favorite */}
      <div className="flex items-center justify-between gap-4 ">
        <ProgressCircle
          value={percentage}
          size={58}
          strokeWidth={4}
          text={`${progress.completed}/${progress.total}`}
        />
        <h3 className="text-lg sm:text-xl font-bold text-foreground flex-1 line-clamp-2">
          {title}
        </h3>
      </div>

      {/* Progress Circle and Stats */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <div className="flex-1 space-y-2 w-full">
          <div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {percentage}% complete
            </p>
            <p className="text-xs text-muted-foreground">{secondaryText}</p>
          </div>
          <div className="space-y-1 text-xs sm:text-sm">
            <p className="text-foreground">
              Subtopics: <span className="font-semibold">{subtopics}</span>
            </p>
            <p className="text-foreground">
              Questions: <span className="font-semibold">{questions}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <Button
          onClick={onAllQuestions}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm py-2 h-auto rounded-lg"
          size="sm"
        >
          Questions
        </Button>
        <Button
          onClick={onAllSubtopics}
          className="bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm py-2 h-auto rounded-lg"
          size="sm"
        >
          Subtopics
        </Button>
        <Button
          onClick={onRandomQuiz}
          className="bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm py-2 h-auto rounded-lg"
          size="sm"
        >
          Random Quiz
        </Button>
      </div>
    </div>
  );
}
