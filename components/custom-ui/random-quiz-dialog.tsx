"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ClipboardList, Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { buildExamUrl } from "@/lib/quiz-content";

type RandomQuizDialogProps = {
  topic: string | null;
  maxQuestions?: number;
  examPath?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const MIN_QUESTIONS = 1;

export function RandomQuizDialog({
  topic,
  maxQuestions = 50,
  examPath = "/mock-master/exam",
  open,
  onOpenChange,
}: RandomQuizDialogProps) {
  const router = useRouter();
  const defaultCount = Math.min(25, Math.max(MIN_QUESTIONS, maxQuestions));
  const [questionCount, setQuestionCount] = useState(defaultCount);

  useEffect(() => {
    if (open) {
      setQuestionCount(defaultCount);
    }
  }, [defaultCount, open, topic]);

  const updateQuestionCount = (count: number) => {
    setQuestionCount(Math.min(maxQuestions, Math.max(MIN_QUESTIONS, count)));
  };

  const handleStart = () => {
    if (!topic) {
      return;
    }

    onOpenChange(false);
    router.push(buildExamUrl(examPath, topic, questionCount));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-[1.75rem] border-border bg-card">
        <DialogHeader>
          <div className="mb-2 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <ClipboardList className="size-5" />
          </div>
          <DialogTitle>Random Quiz</DialogTitle>
          <DialogDescription>
            {topic
              ? `${topic} থেকে কতটি প্রশ্ন নিয়ে কুইজ শুরু করবেন?`
              : "কতটি প্রশ্ন নিয়ে কুইজ শুরু করবেন?"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border border-border bg-background/70 p-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => updateQuestionCount(questionCount - 1)}
            disabled={questionCount <= MIN_QUESTIONS}
            className="rounded-xl"
            aria-label="Decrease questions"
          >
            <Minus className="size-4" />
          </Button>

          <div>
            <p className="mb-1 text-xs font-medium text-muted-foreground">
              প্রশ্নের সংখ্যা
            </p>
            <Input
              type="number"
              inputMode="numeric"
              min={MIN_QUESTIONS}
              max={maxQuestions}
              value={questionCount}
              onChange={(event) =>
                updateQuestionCount(Number(event.target.value))
              }
              className="h-12 rounded-xl bg-card text-center text-2xl font-bold"
              aria-label="Question count"
            />
            <p className="mt-1 text-center text-xs text-muted-foreground">
              সর্বোচ্চ {maxQuestions}
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => updateQuestionCount(questionCount + 1)}
            disabled={questionCount >= maxQuestions}
            className="rounded-xl"
            aria-label="Increase questions"
          >
            <Plus className="size-4" />
          </Button>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            না
          </Button>
          <Button type="button" onClick={handleStart} disabled={!topic}>
            শুরু করো
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
