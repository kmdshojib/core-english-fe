"use client";

import { useEffect, useState } from "react";
import { Layers3, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface QuizActionProps {
  questionCount?: number;
  selectedCount?: number;
  minQuestions?: number;
  maxQuestions?: number;
  onDecreaseQuestions?: () => void;
  onIncreaseQuestions?: () => void;
  onQuestionCountChange?: (count: number) => void;
  onStart?: () => void;
  loading?: boolean;
}

export function QuizAction({
  questionCount = 25,
  selectedCount = 0,
  minQuestions = 1,
  maxQuestions = 100,
  onDecreaseQuestions,
  onIncreaseQuestions,
  onQuestionCountChange,
  onStart,
  loading = false,
}: QuizActionProps) {
  const [questionInput, setQuestionInput] = useState(String(questionCount));

  useEffect(() => {
    setQuestionInput(String(questionCount));
  }, [questionCount]);

  const commitQuestionInput = () => {
    const parsedCount = Number.parseInt(questionInput, 10);

    if (Number.isNaN(parsedCount)) {
      setQuestionInput(String(questionCount));
      return;
    }

    const nextCount = Math.min(
      maxQuestions,
      Math.max(minQuestions, parsedCount),
    );

    setQuestionInput(String(nextCount));
    onQuestionCountChange?.(nextCount);
  };

  return (
    <div className="w-full rounded-2xl border border-border/70 bg-background/95 p-3 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.45)] backdrop-blur">
      <div className="space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="rounded-xl border border-border/70 bg-card px-2.5 py-1.5 text-right w-full items-center flex justify-between">
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Layers3 className="size-3" />
              Topic
            </div>
            <p className="text-base font-bold text-foreground">
              {selectedCount}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl border border-border/70 bg-card/80 p-3">
          <div className="space-y-0.5">
            <p className="text-xs font-medium text-muted-foreground">
              প্রশ্নের সংখ্যা
            </p>
            <Input
              type="number"
              inputMode="numeric"
              min={minQuestions}
              max={maxQuestions}
              value={questionInput}
              onChange={(event) => setQuestionInput(event.target.value)}
              onBlur={commitQuestionInput}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.currentTarget.blur();
                }
              }}
              disabled={loading || !onQuestionCountChange}
              className="mt-1 h-10 max-w-32 rounded-xl bg-background text-2xl font-bold"
              aria-label="Question count"
            />
          </div>

          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={onDecreaseQuestions}
              disabled={loading || !onDecreaseQuestions}
              className="size-7 rounded-lg"
              aria-label="Decrease questions"
            >
              <Minus className="size-3" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={onIncreaseQuestions}
              disabled={loading || !onIncreaseQuestions}
              className="size-7 rounded-lg"
              aria-label="Increase questions"
            >
              <Plus className="size-3" />
            </Button>
          </div>
        </div>

        <Button
          type="button"
          onClick={onStart}
          disabled={loading || selectedCount === 0}
          className="h-9 w-full rounded-xl text-sm font-bold shadow-md"
        >
          {loading ? "শুরু হচ্ছে..." : "মক পরীক্ষা শুরু করো"}
        </Button>
      </div>
    </div>
  );
}
