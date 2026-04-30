"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getMockExamQuestions, type QuestionSource } from "@/lib/quiz-content";

const OPTION_LABELS = ["ক", "খ", "গ", "ঘ"];
type AnswerFilter = "all" | "answered" | "unanswered";
const RESULT_STORAGE_PREFIX = "mock-master-result";

interface MockQuestion {
  id: number;
  topic: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation?: string;
}

interface StoredMockResult {
  topics: string[];
  totalTime: number;
  hasNegativeMarking: boolean;
  totalQuestions: number;
  answers: Record<number, number>;
  questions: MockQuestion[];
}

type MockExamClientProps = {
  title?: string;
  homePath?: string;
  resultPath?: string;
  resultStoragePrefix?: string;
  questionSource?: QuestionSource;
};

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function MockExamClient({
  title = "মক পরীক্ষা",
  homePath = "/mock-master",
  resultPath = "/mock-master/result",
  resultStoragePrefix = RESULT_STORAGE_PREFIX,
  questionSource = "all",
}: MockExamClientProps = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reviewId = searchParams.get("review");
  const sourceParam = searchParams.get("source") as QuestionSource | null;
  const activeQuestionSource = sourceParam ?? questionSource;
  const topicsParam = searchParams.get("topics") ?? "";
  const [reviewResult, setReviewResult] = useState<StoredMockResult | null>(
    null,
  );
  const topics = useMemo(() => {
    if (reviewResult) {
      return reviewResult.topics;
    }

    const parsedTopics = topicsParam
      .split("||")
      .map((item) => item.trim())
      .filter(Boolean);

    return parsedTopics.length > 0 ? parsedTopics : ["Mock Master"];
  }, [reviewResult, topicsParam]);
  const questionCount =
    reviewResult?.totalQuestions ?? Number(searchParams.get("questions") ?? 25);
  const totalTime =
    reviewResult?.totalTime ?? Number(searchParams.get("time") ?? 25);
  const hasNegativeMarking =
    reviewResult?.hasNegativeMarking ??
    searchParams.get("negative") !== "false";
  const [remainingSeconds, setRemainingSeconds] = useState(
    reviewId ? 0 : totalTime * 60,
  );
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [lockedQuestions, setLockedQuestions] = useState<Record<number, true>>(
    {},
  );
  const [submitted, setSubmitted] = useState(Boolean(reviewId));
  const [answerFilter, setAnswerFilter] = useState<AnswerFilter>("all");
  const [submitConfirmationOpen, setSubmitConfirmationOpen] = useState(false);
  const [backConfirmationOpen, setBackConfirmationOpen] = useState(false);
  const [explanationQuestionId, setExplanationQuestionId] = useState<
    number | null
  >(null);

  const questions = useMemo(() => {
    if (reviewResult) {
      return reviewResult.questions;
    }

    return getMockExamQuestions(topics, questionCount, activeQuestionSource);
  }, [activeQuestionSource, questionCount, reviewResult, topics]);

  const activeExplanationQuestion =
    questions.find((question) => question.id === explanationQuestionId) ?? null;

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = Math.max(questions.length - answeredCount, 0);
  const wrongCount = questions.filter((question) => {
    const answer = answers[question.id];

    return answer !== undefined && answer !== question.answer;
  }).length;
  const correctCount = answeredCount - wrongCount;
  const filteredQuestions = useMemo(() => {
    if (answerFilter === "answered") {
      return questions.filter((question) => answers[question.id] !== undefined);
    }

    if (answerFilter === "unanswered") {
      return questions.filter((question) => answers[question.id] === undefined);
    }

    return questions;
  }, [answerFilter, answers, questions]);
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

  const finishExam = useCallback(
    (redirectToResult = true) => {
      const resultId = `${Date.now()}`;
      const result = {
        id: resultId,
        submittedAt: new Date().toISOString(),
        topics,
        totalTime,
        hasNegativeMarking,
        totalQuestions: questions.length,
        answers,
        questions,
        answeredCount,
        correctCount,
        wrongCount,
        unansweredCount,
        score,
        rows: questions.map((question) => {
          const selectedAnswer = answers[question.id];
          const isAnswered = selectedAnswer !== undefined;
          const isCorrect = selectedAnswer === question.answer;

          return {
            id: question.id,
            topic: question.topic,
            prompt: question.prompt,
            selectedAnswer:
              selectedAnswer === undefined
                ? null
                : question.options[selectedAnswer],
            correctAnswer: question.options[question.answer],
            status: !isAnswered
              ? "Unanswered"
              : isCorrect
                ? "Correct"
                : "Wrong",
            mark: !isAnswered
              ? 0
              : isCorrect
                ? 1
                : hasNegativeMarking
                  ? -0.5
                  : 0,
          };
        }),
      };

      window.sessionStorage.setItem(
        `${resultStoragePrefix}:${resultId}`,
        JSON.stringify(result),
      );
      setSubmitted(true);
      setSubmitConfirmationOpen(false);
      setBackConfirmationOpen(false);

      if (redirectToResult) {
        router.push(`${resultPath}?id=${resultId}`);
      }
    },
    [
      answeredCount,
      answers,
      correctCount,
      hasNegativeMarking,
      questions,
      resultPath,
      resultStoragePrefix,
      router,
      score,
      topics,
      totalTime,
      unansweredCount,
      wrongCount,
    ],
  );

  useEffect(() => {
    if (!reviewId) {
      return;
    }

    const storedResult = window.sessionStorage.getItem(
      `${resultStoragePrefix}:${reviewId}`,
    );

    if (!storedResult) {
      return;
    }

    const parsedResult = JSON.parse(storedResult) as StoredMockResult;
    if (!Array.isArray(parsedResult.questions)) {
      return;
    }

    const restoredAnswers = parsedResult.answers ?? {};
    const restoredLocks = Object.keys(restoredAnswers).reduce<
      Record<number, true>
    >((current, questionId) => {
      current[Number(questionId)] = true;
      return current;
    }, {});

    setReviewResult(parsedResult);
    setAnswers(restoredAnswers);
    setLockedQuestions(restoredLocks);
    setSubmitted(true);
    setRemainingSeconds(0);
  }, [resultStoragePrefix, reviewId]);

  useEffect(() => {
    if (submitted || reviewId) {
      return;
    }

    const timer = window.setInterval(() => {
      setRemainingSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          finishExam();
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [finishExam, reviewId, submitted]);

  useEffect(() => {
    if (submitted || reviewId) {
      return;
    }

    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
      setBackConfirmationOpen(true);
    };

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, [reviewId, submitted]);

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
      router.push(reviewId ? `${resultPath}?id=${reviewId}` : homePath);
      return;
    }

    setBackConfirmationOpen(true);
  };

  const handleSubmitAndLeave = () => {
    finishExam(false);
    router.push(homePath);
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
              <h1 className="truncate text-xl font-bold">{title}</h1>
              <p className="text-sm text-muted-foreground">
                {topics.length}টি টপিক • সময়ঃ {totalTime} মিনিট
              </p>
            </div>
            <div className="w-9" />
          </div>

          {/* <p className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-muted-foreground">
            প্রতিটি প্রশ্নের পূর্ণমান প্রশ্নের পাশে লেখা আছে
            {hasNegativeMarking ? " এবং ভুলপ্রতি ০.৫ মার্ক কাটা যাবে" : ""}
          </p> */}

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-background/70 p-3">
            <div>
              <p className="text-sm font-semibold text-foreground">
                প্রশ্ন ফিল্টার
              </p>
              <p className="text-xs text-muted-foreground">
                Answered {answeredCount} • Unanswered {unansweredCount}
              </p>
            </div>
            <Select
              value={answerFilter}
              onValueChange={(value) => setAnswerFilter(value as AnswerFilter)}
            >
              <SelectTrigger className="w-44 bg-card">
                <SelectValue placeholder="All questions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All questions</SelectItem>
                <SelectItem value="answered">Answered</SelectItem>
                <SelectItem value="unanswered">Unanswered</SelectItem>
              </SelectContent>
            </Select>
          </div>
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

        {filteredQuestions.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-card/70 px-4 py-8 text-center text-sm text-muted-foreground">
            No questions found for this filter.
          </div>
        )}

        {filteredQuestions.map((question) => (
          <section
            key={question.id}
            className="space-y-4 border-b border-border pb-5 last:border-b-0"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold leading-snug">
                  {question.id}. {question.prompt}
                </h2>
              </div>
            </div>

            <div className="space-y-3">
              {question.options.map((option, optionIndex) => {
                const isSelected = answers[question.id] === optionIndex;
                const isLocked = Boolean(lockedQuestions[question.id]);
                const isUnavailable = isLocked && !isSelected && !submitted;
                const isCorrect = submitted && question.answer === optionIndex;
                const isWrong =
                  submitted && isSelected && question.answer !== optionIndex;

                return (
                  <button
                    key={option}
                    type="button"
                    disabled={submitted || (isLocked && !isSelected)}
                    onClick={() => handleAnswerSelect(question.id, optionIndex)}
                    className={`flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition ${
                      isCorrect
                        ? "border-emerald-500 bg-emerald-500/10"
                        : isWrong
                          ? "border-destructive bg-destructive/10"
                          : isSelected
                            ? "border-primary bg-primary/10"
                            : "border-border bg-card hover:border-foreground/20"
                    } disabled:cursor-not-allowed ${isUnavailable ? "opacity-60" : ""}`}
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-current text-base font-bold">
                      {OPTION_LABELS[optionIndex]}
                    </span>
                    <span className="flex-1 font-medium">{option}</span>
                    {/* {isUnavailable && (
                      <span className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
                        <Lock className="size-3" />
                        Locked
                      </span>
                    )} */}
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
              {submitted && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setExplanationQuestionId(question.id)}
                >
                  <BookOpenText className="size-4" />
                  ব্যাখ্যা
                </Button>
              )}
            </div>
          </section>
        ))}
      </Container>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 px-4 py-2 backdrop-blur">
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
            <AlertDialogAction onClick={() => finishExam()}>
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
            <AlertDialogAction onClick={() => finishExam()}>
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
                {activeExplanationQuestion.id}.{" "}
                {activeExplanationQuestion.prompt}
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
