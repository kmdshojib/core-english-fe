"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  BookOpenText,
  CheckCircle2,
  ClipboardCheck,
  Lock,
  LogOut,
  XCircle,
} from "lucide-react";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const QUESTION_BANK = [
  {
    prompt: "Choose the correct sentence.",
    options: [
      "He go to school.",
      "He goes to school.",
      "He going school.",
      "He gone to school.",
    ],
    answer: 1,
    explanation:
      "He goes to school is correct because the subject is third person singular, so the verb takes 'es'.",
  },
  {
    prompt: "Identify the noun in the sentence: The teacher smiled.",
    options: ["The", "teacher", "smiled", "sentence"],
    answer: 1,
    explanation:
      "Teacher is the naming word here, so it functions as the noun in the sentence.",
  },
  {
    prompt: "Select the correct synonym of 'rapid'.",
    options: ["slow", "quick", "weak", "late"],
    answer: 1,
    explanation:
      "Rapid means fast or quick, so 'quick' is the closest synonym.",
  },
  {
    prompt: "Which one is a modal auxiliary?",
    options: ["can", "run", "book", "quickly"],
    answer: 0,
    explanation:
      "'Can' is a modal auxiliary because it helps express ability or possibility.",
  },
  {
    prompt: "Choose the correct plural form of 'child'.",
    options: ["childs", "childes", "children", "childrens"],
    answer: 2,
    explanation:
      "'Children' is the irregular plural form of 'child'.",
  },
];

const OPTION_LABELS = ["ক", "খ", "গ", "ঘ"];

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function MockExamClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const parsedTopics = (searchParams.get("topics") ?? "")
    .split("||")
    .map((item) => item.trim())
    .filter(Boolean);
  const topics = parsedTopics.length > 0 ? parsedTopics : ["Mock Master"];
  const questionCount = Number(searchParams.get("questions") ?? 25);
  const totalTime = Number(searchParams.get("time") ?? 25);
  const hasNegativeMarking = searchParams.get("negative") !== "false";
  const [remainingSeconds, setRemainingSeconds] = useState(totalTime * 60);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [lockedQuestions, setLockedQuestions] = useState<Record<number, true>>(
    {},
  );
  const [submitted, setSubmitted] = useState(false);
  const [submitConfirmationOpen, setSubmitConfirmationOpen] = useState(false);
  const [backConfirmationOpen, setBackConfirmationOpen] = useState(false);
  const [explanationQuestionId, setExplanationQuestionId] = useState<
    number | null
  >(null);

  const questions = useMemo(
    () =>
      Array.from({ length: questionCount }, (_, index) => {
        const base = QUESTION_BANK[index % QUESTION_BANK.length];
        const questionTopic = topics[index % topics.length];

        return {
          ...base,
          id: index + 1,
          topic: questionTopic,
          prompt: `${base.prompt} (${questionTopic})`,
        };
      }),
    [questionCount, topics],
  );

  const activeExplanationQuestion =
    questions.find((question) => question.id === explanationQuestionId) ?? null;

  useEffect(() => {
    if (submitted) {
      return;
    }

    const timer = window.setInterval(() => {
      setRemainingSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setSubmitted(true);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [submitted]);

  useEffect(() => {
    if (submitted) {
      return;
    }

    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
      setBackConfirmationOpen(true);
    };

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, [submitted]);

  const answeredCount = Object.keys(answers).length;
  const score = questions.reduce((total, question) => {
    const answer = answers[question.id];

    if (answer === undefined) {
      return total;
    }

    if (answer === question.answer) {
      return total + 1;
    }

    return hasNegativeMarking ? total - 0.5 : total;
  }, 0);

  const handleSubmitMock = () => {
    setSubmitted(true);
    setSubmitConfirmationOpen(false);
  };

  const handleAnswerSelect = (questionId: number, optionIndex: number) => {
    if (submitted || lockedQuestions[questionId]) {
      return;
    }

    setAnswers((current) => ({
      ...current,
      [questionId]: optionIndex,
    }));
    setLockedQuestions((current) => ({
      ...current,
      [questionId]: true,
    }));
  };

  const handleBackPress = () => {
    if (submitted) {
      router.push("/mock-master");
      return;
    }

    setBackConfirmationOpen(true);
  };

  const handleSubmitAndLeave = () => {
    setSubmitted(true);
    setBackConfirmationOpen(false);
    router.push("/mock-master");
  };

  return (
    <main className="min-h-screen bg-background pb-28 text-foreground">
      <div data-hide-bottom-nav="true" />

      <div className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur">
        <Container size="sm" className="py-4">
          <div className="flex items-center justify-between gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackPress}
              aria-label="Back"
              className="-ml-2"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <div className="min-w-0 flex-1 text-center">
              <h1 className="truncate text-xl font-bold">মক পরীক্ষা</h1>
              <p className="text-sm text-muted-foreground">
                {topics.length}টি টপিক • সময়ঃ {totalTime} মিনিট
              </p>
            </div>
            <div className="w-9" />
          </div>

          <p className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-muted-foreground">
            প্রতিটি প্রশ্নের পূর্ণমান প্রশ্নের পাশে লেখা আছে
            {hasNegativeMarking ? " এবং ভুলপ্রতি ০.৫ মার্ক কাটা যাবে" : ""}
          </p>
        </Container>
      </div>

      <Container size="sm" className="space-y-4 py-5">
        {submitted && (
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-center">
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              সাবমিট সম্পন্ন হয়েছে
            </p>
            <p className="mt-1 text-2xl font-bold">
              স্কোর: {score}/{questionCount}
            </p>
          </div>
        )}

        {questions.map((question) => (
          <section
            key={question.id}
            className="space-y-4 border-b border-border pb-5 last:border-b-0"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex rounded-full border border-border bg-muted/70 px-3 py-1 text-xs font-semibold text-muted-foreground">
                  {question.topic}
                </div>
                <h2 className="text-lg font-semibold leading-snug">
                  {question.id}. {question.prompt}
                </h2>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold">
                  1
                </span>
                {lockedQuestions[question.id] && !submitted && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-700 dark:text-amber-300">
                    <Lock className="size-3" />
                    Locked
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {question.options.map((option, optionIndex) => {
                const isSelected = answers[question.id] === optionIndex;
                const isCorrect = submitted && question.answer === optionIndex;
                const isWrong =
                  submitted && isSelected && question.answer !== optionIndex;

                return (
                  <button
                    key={option}
                    type="button"
                    disabled={submitted || Boolean(lockedQuestions[question.id])}
                    onClick={() => handleAnswerSelect(question.id, optionIndex)}
                    className={`flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition ${
                      isCorrect
                        ? "border-emerald-500 bg-emerald-500/10"
                        : isWrong
                          ? "border-destructive bg-destructive/10"
                          : isSelected
                            ? "border-primary bg-primary/10"
                            : "border-border bg-card hover:border-foreground/20"
                    }`}
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-current text-base font-bold">
                      {OPTION_LABELS[optionIndex]}
                    </span>
                    <span className="font-medium">{option}</span>
                    {submitted && isCorrect && (
                      <CheckCircle2 className="ml-auto size-5 shrink-0 text-emerald-600" />
                    )}
                    {submitted && isWrong && (
                      <XCircle className="ml-auto size-5 shrink-0 text-destructive" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-2">
              {
                submitted && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                  >
                    <BookOpenText className="size-4" />
                    ব্যাখ্যা
                  </Button>
                )
              }
            </div>
          </section>
        ))}
      </Container>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 px-4 py-5 backdrop-blur">
        <Container size="sm">
          <Button
            size="lg"
            className="grid h-16 w-full grid-cols-[1fr_auto_1fr] rounded-3xl px-5 text-xl font-bold sm:h-20 sm:text-2xl"
            onClick={() => setSubmitConfirmationOpen(true)}
            disabled={submitted}
          >
            <span className="text-left">{formatTime(remainingSeconds)}</span>
            <span className="border-x border-primary-foreground/30 px-5 sm:px-12">
              সাবমিট করো
            </span>
            <span className="text-right">
              {answeredCount}/{questionCount}
            </span>
          </Button>
        </Container>
      </div>

      <AlertDialog
        open={submitConfirmationOpen}
        onOpenChange={setSubmitConfirmationOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia>
              <ClipboardCheck className="size-8" />
            </AlertDialogMedia>
            <AlertDialogTitle>পরীক্ষা সাবমিট করবেন?</AlertDialogTitle>
            <AlertDialogDescription>
              আপনি {answeredCount}/{questionCount}টি প্রশ্নের উত্তর দিয়েছেন।
              সাবমিট করার পর উত্তর পরিবর্তন করা যাবে না।
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>না</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmitMock}>
              সাবমিট করো
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={backConfirmationOpen}
        onOpenChange={setBackConfirmationOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia>
              <LogOut className="size-8" />
            </AlertDialogMedia>
            <AlertDialogTitle>পরীক্ষা থেকে বের হবেন?</AlertDialogTitle>
            <AlertDialogDescription>
              পরীক্ষা চলাকালীন সরাসরি ফিরে যাওয়া যাবে না। বের হতে চাইলে বর্তমান
              উত্তরগুলো সাবমিট হবে।
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>থাকুন</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmitAndLeave}>
              সাবমিট করে বের হন
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog
        open={explanationQuestionId !== null}
        onOpenChange={(open) => {
          if (!open) {
            setExplanationQuestionId(null);
          }
        }}
      >
        <DialogContent className="max-w-md rounded-[1.75rem] border-border bg-card">
          <DialogHeader>
            <DialogTitle>ব্যাখ্যা</DialogTitle>
          </DialogHeader>
          {activeExplanationQuestion && (
            <div className="space-y-3">
              <p className="text-sm font-semibold text-foreground">
                {activeExplanationQuestion.id}. {activeExplanationQuestion.prompt}
              </p>
              <p className="text-sm leading-6 text-muted-foreground">
                {activeExplanationQuestion.explanation ??
                  "এই প্রশ্নের জন্য কোনো ব্যাখ্যা যোগ করা হয়নি।"}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
