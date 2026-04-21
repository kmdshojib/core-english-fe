"use client";

import { Container } from "@/components/container";
import BackButton from "@/components/custom-ui/back-button";
import TopicCard from "@/components/custom-ui/topic-card";
import { Button } from "@/components/ui/button";
import { Back } from "@hugeicons/core-free-icons";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const ReadingPage = () => {
  const router = useRouter();

  const topics = [
    "Basic Part",
    "Sentence Structure",
    "Noun",
    "Number",
    "Gender",
    "Pronoun",
    "Adjective",
    "Verb",
    "Modal Auxiliary",
    "Gerund",
    "Participle",
    "Adverb",
    "Infinitive",
    "Tenses",
    "Vocabulary",
    "Idioms",
    "Phrasal Verbs",
  ];

  return (
    <main className="min-h-screen bg-background pb-12 text-foreground">
      <Container size="sm">
        {/* Back Button */}
        <BackButton onPress={() => router.back()} />

        {/* Topics Grid */}
        <div className="grid gap-4">
          {topics.map((topic) => (
            <TopicCard key={topic} title={topic} />
          ))}
        </div>
      </Container>
    </main>
  );
};

export default ReadingPage;
