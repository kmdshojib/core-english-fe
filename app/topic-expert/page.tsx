"use client";

import { GraduationCap, Sparkles, Target } from "lucide-react";
import { useRouter } from "next/navigation";

import { Container } from "@/components/container";
import BackButton from "@/components/custom-ui/back-button";
import { SubjectCard } from "@/components/custom-ui/subject-card";

const SUBJECTS = [
  {
    title: "Noun",
    progress: { completed: 5, total: 20 },
    percentage: 25,
    subtopics: 5,
    questions: 20,
  },
  {
    title: "Verb",
    progress: { completed: 9, total: 18 },
    percentage: 50,
    subtopics: 6,
    questions: 32,
  },
  {
    title: "Tense",
    progress: { completed: 12, total: 16 },
    percentage: 75,
    subtopics: 4,
    questions: 28,
  },
];

const TopicExpert = () => {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-background pb-10 text-foreground">
      <Container size="sm" className="py-4 sm:py-6">
        <BackButton onPress={() => router.back()} />

        <section className="mt-6 space-y-4">
          {SUBJECTS.map((subject) => (
            <SubjectCard
              key={subject.title}
              title={subject.title}
              progress={subject.progress}
              percentage={subject.percentage}
              subtopics={subject.subtopics}
              questions={subject.questions}
            />
          ))}
        </section>
      </Container>
    </main>
  );
};

export default TopicExpert;
