"use client";

import { BookOpen, CircleHelp, Shuffle } from "lucide-react";

import { ProgressCircle } from "../ProgressCircle";
import { Button } from "@/components/ui/button";

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
  showSubtopics?: boolean;
  secondaryText?: string;
  eyebrow?: string;
}

export function SubjectCard({
  title,
  progress,
  percentage,
  subtopics,
  questions,
  onAllQuestions,
  onAllSubtopics,
  onRandomQuiz,
  showSubtopics = true,
  secondaryText = "পড়া হয়েছে",
  eyebrow = "Topic Expert",
}: SubjectCardProps) {
  const actionCount =
    Number(Boolean(showSubtopics && onAllSubtopics)) +
    Number(Boolean(onAllQuestions)) +
    Number(Boolean(onRandomQuiz));

  return (
    <article className="overflow-hidden rounded-3xl border border-border/80 bg-card/95 shadow-sm">
      <div className="h-1.5 w-full bg-gradient-to-r from-rose-500 via-amber-400 to-indigo-500" />

      <div className="space-y-5 p-4 sm:p-5">
        <div className="flex items-start gap-4">
          <ProgressCircle
            value={percentage}
            size={68}
            strokeWidth={5}
            text={`${progress.completed}/${progress.total}`}
            className="shrink-0"
          />

          <div className="min-w-0 flex-1">
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {eyebrow}
              </p>
            )}
            <h3 className="mt-1 line-clamp-2 text-xl font-bold leading-tight text-foreground">
              {title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {percentage}% complete · {secondaryText}
            </p>
          </div>
        </div>

        <div className={`grid gap-3 ${showSubtopics ? "grid-cols-2" : ""}`}>
          {showSubtopics && (
            <div className="rounded-2xl bg-muted/50 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Subtopics
              </p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                {subtopics}
              </p>
            </div>
          )}

          <div className="rounded-2xl bg-muted/50 px-4 py-2 flex flex-row items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Questions
            </p>
            <p className="mt-1 text-lg font-semibold text-foreground">
              {questions}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-border/70 bg-background/70 px-4 py-3">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">Progress</span>
            <span className="text-muted-foreground">
              {progress.completed}/{progress.total} lessons
            </span>
          </div>
          <div className="h-2 rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-amber-400 transition-all"
              style={{ width: `${Math.max(0, Math.min(100, percentage))}%` }}
            />
          </div>
        </div>

        <div
          className={`grid grid-cols-1 gap-2.5 ${
            actionCount >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
          }`}
        >
          {showSubtopics && onAllSubtopics && (
            <Button
              type="button"
              onClick={onAllSubtopics}
              className="h-11 justify-start rounded-2xl bg-amber-500 text-sm font-semibold text-white hover:bg-amber-600 sm:justify-center"
            >
              <BookOpen className="mr-2 h-4 w-4 sm:hidden" />
              All Subtopics
            </Button>
          )}

          {onAllQuestions && (
            <Button
              type="button"
              onClick={onAllQuestions}
              className="h-11 justify-start rounded-2xl bg-indigo-500 text-sm font-semibold text-white hover:bg-indigo-600 sm:justify-center"
            >
              <CircleHelp className="mr-2 h-4 w-4 sm:hidden" />
              All Questions
            </Button>
          )}

          {onRandomQuiz && (
            <Button
              type="button"
              onClick={onRandomQuiz}
              className="h-11 justify-start rounded-2xl bg-rose-500 text-sm font-semibold text-white hover:bg-rose-600 sm:justify-center"
            >
              <Shuffle className="mr-2 h-4 w-4 sm:hidden" />
              Random Quiz
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
