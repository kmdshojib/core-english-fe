"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Container } from "@/components/container";
import BackButton from "@/components/custom-ui/back-button";
import { RandomQuizDialog } from "@/components/custom-ui/random-quiz-dialog";
import { SubjectCard } from "@/components/custom-ui/subject-card";
import {
  PREVIOUS_YEAR_SUBJECTS,
  slugifyTopic,
  type QuizSubject,
} from "@/lib/quiz-content";

const PreviousYearQuestion = () => {
  const router = useRouter();
  const [quizSubject, setQuizSubject] = useState<QuizSubject | null>(null);

  return (
    <main className="min-h-screen bg-background pb-10 text-foreground">
      <Container size="sm" className="py-4 sm:py-6">
        <BackButton onPress={() => router.back()} />

        <section className="mt-6 space-y-4">
          {PREVIOUS_YEAR_SUBJECTS.map((subject) => (
            <SubjectCard
              key={subject.title}
              title={subject.title}
              progress={subject.progress}
              percentage={subject.percentage}
              subtopics={subject.subtopics}
              questions={subject.questions}
              showSubtopics={false}
              eyebrow="Previous Year"
              secondaryText="প্র্যাকটিস হয়েছে"
              onAllQuestions={() =>
                router.push(
                  `/previous/questions/${slugifyTopic(subject.title)}`,
                )
              }
              onRandomQuiz={() => setQuizSubject(subject)}
            />
          ))}
        </section>
      </Container>

      <RandomQuizDialog
        topic={quizSubject?.title ?? null}
        maxQuestions={quizSubject?.questions}
        examPath="/previous/exam"
        open={quizSubject !== null}
        onOpenChange={(open) => {
          if (!open) {
            setQuizSubject(null);
          }
        }}
      />
    </main>
  );
};

export default PreviousYearQuestion;
