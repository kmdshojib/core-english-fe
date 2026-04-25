"use client";

import { Layers3, Minus, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuizActionProps {
  questionCount?: number;
  selectedCount?: number;
  onDecreaseQuestions?: () => void;
  onIncreaseQuestions?: () => void;
  onStart?: () => void;
  loading?: boolean;
}

export function QuizAction({
  questionCount = 25,
  selectedCount = 0,
  onDecreaseQuestions,
  onIncreaseQuestions,
  onStart,
  loading = false,
}: QuizActionProps) {
  return (
    <div className="w-full rounded-[2rem] border border-border/70 bg-background/95 p-4 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.45)] backdrop-blur sm:p-5">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="size-3.5" />
              Mock Setup
            </div>
            <h3 className="text-xl font-bold text-foreground sm:text-2xl">
              পরীক্ষা শুরু করার আগে সেটআপ ঠিক করুন
            </h3>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card px-3 py-2 text-right">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Layers3 className="size-3.5" />
              Topic
            </div>
            <p className="mt-1 text-lg font-bold text-foreground">
              {selectedCount}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-[1.6rem] border border-border/70 bg-card/80 p-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              প্রশ্নের সংখ্যা
            </p>
            <p className="text-3xl font-bold text-foreground sm:text-4xl">
              {questionCount}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={onDecreaseQuestions}
              disabled={loading || !onDecreaseQuestions}
              className="size-12 rounded-2xl"
              aria-label="Decrease questions"
            >
              <Minus className="size-5" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={onIncreaseQuestions}
              disabled={loading || !onIncreaseQuestions}
              className="size-12 rounded-2xl"
              aria-label="Increase questions"
            >
              <Plus className="size-5" />
            </Button>
          </div>
        </div>

        <Button
          type="button"
          onClick={onStart}
          disabled={loading || selectedCount === 0}
          size="lg"
          className="h-16 w-full rounded-[1.6rem] text-base font-bold shadow-lg sm:h-18 sm:text-lg"
        >
          {loading ? "শুরু হচ্ছে..." : "মক পরীক্ষা শুরু করো"}
        </Button>
      </div>
    </div>
  );
}
