"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, BookOpenText, ClipboardCheck } from "lucide-react";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const RESULT_STORAGE_PREFIX = "mock-master-result";

interface ResultRow {
  id: number;
  topic: string;
  prompt: string;
  selectedAnswer: string | null;
  correctAnswer: string;
  status: "Correct" | "Wrong" | "Unanswered";
  mark: number;
}

interface MockResult {
  id: string;
  submittedAt: string;
  topics: string[];
  totalTime: number;
  hasNegativeMarking: boolean;
  totalQuestions: number;
  answeredCount: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  score: number;
  questions?: unknown[];
  rows: ResultRow[];
}

type MockResultClientProps = {
  homePath?: string;
  examPath?: string;
  resultStoragePrefix?: string;
};

export function MockResultClient({
  homePath = "/mock-master",
  examPath = "/mock-master/exam",
  resultStoragePrefix = RESULT_STORAGE_PREFIX,
}: MockResultClientProps = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resultId = searchParams.get("id");
  const [result, setResult] = useState<MockResult | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!resultId) {
      setLoaded(true);
      return;
    }

    const storedResult = window.sessionStorage.getItem(
      `${resultStoragePrefix}:${resultId}`,
    );

    if (storedResult) {
      setResult(JSON.parse(storedResult) as MockResult);
    }

    setLoaded(true);
  }, [resultId, resultStoragePrefix]);

  const summaryRows = useMemo(() => {
    if (!result) {
      return [];
    }

    return [
      ["Total Questions", result.totalQuestions],
      ["Answered", result.answeredCount],
      ["Correct", result.correctCount],
      ["Wrong", result.wrongCount],
      ["Unanswered", result.unansweredCount],
      ["Score", result.score],
    ] as const;
  }, [result]);

  if (loaded && !result) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <Container size="sm" className="py-5">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => router.push(homePath)}
            aria-label="Back"
            className="-ml-2"
          >
            <ArrowLeft className="size-5" />
          </Button>

          <div className="mt-8 rounded-2xl border border-dashed border-border bg-card/70 px-4 py-8 text-center">
            <p className="font-semibold">No result found.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Please submit a mock exam first.
            </p>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pb-10 text-foreground">
      <div data-hide-bottom-nav="true" />

      <div className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur">
        <Container size="sm" className="py-4">
          <div className="flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => router.push(homePath)}
              aria-label="Back"
              className="-ml-2"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <div className="min-w-0 flex-1 text-center">
              <h1 className="truncate text-xl font-bold">মার্কশিট</h1>
              <p className="text-sm text-muted-foreground">
                {result?.topics.length ?? 0}টি টপিক • সময়ঃ{" "}
                {result?.totalTime ?? 0} মিনিট
              </p>
            </div>
            <div className="w-9" />
          </div>
        </Container>
      </div>

      <Container size="sm" className="space-y-4 py-5">
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
            <ClipboardCheck className="size-6" />
          </div>
          <p className="mt-3 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
            পরীক্ষা সাবমিট হয়েছে
          </p>
          <p className="mt-1 text-3xl font-bold">
            {result?.score ?? 0}/{result?.totalQuestions ?? 0}
          </p>
          {resultId && result && result.questions && (
            <Button
              type="button"
              onClick={() => router.push(`${examPath}?review=${resultId}`)}
              className="mt-4 h-10 rounded-xl font-bold"
            >
              <BookOpenText className="size-4" />
              মক রিভিউ ও ব্যাখ্যা
            </Button>
          )}
        </div>

        <section className="rounded-2xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Summary</TableHead>
                <TableHead className="text-right">Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {summaryRows.map(([label, value]) => (
                <TableRow key={label}>
                  <TableCell className="font-medium">{label}</TableCell>
                  <TableCell className="text-right font-bold">
                    {value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        <section className="rounded-2xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Selected</TableHead>
                <TableHead>Correct</TableHead>
                <TableHead className="text-right">Mark</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result?.rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.id}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.selectedAnswer ?? "-"}</TableCell>
                  <TableCell>{row.correctAnswer}</TableCell>
                  <TableCell className="text-right font-bold">
                    {row.mark}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </Container>
    </main>
  );
}
