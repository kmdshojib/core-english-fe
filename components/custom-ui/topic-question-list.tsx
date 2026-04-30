"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/container";
import BackButton from "@/components/custom-ui/back-button";
import {
  QuizOption,
  type QuizQuestion,
} from "@/components/custom-ui/quiz-option";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTopicQuestions, type TopicQuestion } from "@/lib/quiz-content";

type TopicQuestionListProps = {
  topic: string;
  previousYear?: boolean;
};

type ReadFilter = "all" | "read" | "unread";

function toQuizQuestion(question: TopicQuestion): QuizQuestion {
  return {
    id: question.id,
    question: question.prompt,
    options: question.options.map((option, index) => ({
      label: String.fromCharCode(65 + index),
      text: option,
    })),
    correctOptionId: String.fromCharCode(65 + question.answer),
    explanation: question.explanation,
  };
}

function AllQuestionsSection({ questions }: { questions: TopicQuestion[] }) {
  const [readQuestions, setReadQuestions] = useState<Record<number, true>>({});
  const [readFilter, setReadFilter] = useState<ReadFilter>("all");

  const readCount = Object.keys(readQuestions).length;
  const unreadCount = Math.max(questions.length - readCount, 0);
  const filteredQuestions = questions.filter((question) => {
    const isRead = Boolean(readQuestions[question.id]);

    if (readFilter === "read") {
      return isRead;
    }

    if (readFilter === "unread") {
      return !isRead;
    }

    return true;
  });

  const handleReadChange = (questionId: number, checked: boolean) => {
    setReadQuestions((current) => {
      const next = { ...current };

      if (checked) {
        next[questionId] = true;
      } else {
        delete next[questionId];
      }

      return next;
    });
  };

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card/80 p-3">
        <div>
          <p className="text-sm font-semibold text-foreground">
            Question Filter
          </p>
          <p className="text-xs text-muted-foreground">
            Read {readCount} · Unread {unreadCount}
          </p>
        </div>

        <Select
          value={readFilter}
          onValueChange={(value) => setReadFilter(value as ReadFilter)}
        >
          <SelectTrigger className="w-40 bg-background">
            <SelectValue placeholder="All questions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All questions</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredQuestions.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border bg-card/70 px-4 py-8 text-center text-sm text-muted-foreground">
          No questions found for this filter.
        </div>
      )}

      <div className="space-y-4">
        {filteredQuestions.map((question) => {
          const isRead = Boolean(readQuestions[question.id]);

          return (
            <QuizOption
              key={question.id}
              question={toQuizQuestion(question)}
              headerAction={
                <label className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground">
                  <Checkbox
                    checked={isRead}
                    onCheckedChange={(checked) =>
                      handleReadChange(question.id, checked === true)
                    }
                    aria-label={`Mark question ${question.id} as read`}
                  />                
                  </label>
              }
            />
          );
        })}
      </div>
    </section>
  );
}

export function TopicQuestionList({
  topic,
  previousYear = false,
}: TopicQuestionListProps) {
  const router = useRouter();
  const questions = getTopicQuestions(topic, previousYear);

  return (
    <main className="min-h-screen pb-12 text-foreground">
      <Container size="sm" className="py-4 sm:py-6">
        <BackButton onPress={() => router.back()} />

        <AllQuestionsSection questions={questions} />
      </Container>
    </main>
  );
}
