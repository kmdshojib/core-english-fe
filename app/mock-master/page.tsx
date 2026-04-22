"use client";
import { useMemo, useState } from "react";
import { Container } from "@/components/container";
import TopicSearchHeader from "@/components/custom-ui/topic-search-header";
import TopicCard from "@/components/custom-ui/topic-card";
import { useRouter } from "next/navigation";

const MOCK_MASTER_TOPICS = [
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

const MockMaster = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredTopics = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return MOCK_MASTER_TOPICS;
    }

    return MOCK_MASTER_TOPICS.filter((topic) =>
      topic.toLowerCase().includes(query)
    );
  }, [search]);

  return (
    <main className="min-h-screen bg-background pb-12 text-foreground">
      <Container size="sm">
        <TopicSearchHeader
          onBack={() => router.back()}
          value={search}
          onValueChange={setSearch}
          placeholder="Search mock master topics..."
        />

        <div className="grid gap-4">
          {filteredTopics.map((topic) => (
            <TopicCard variant="selectable" key={topic} title={topic} />
          ))}
        </div>

        {filteredTopics.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-card/70 px-4 py-6 text-center text-sm text-muted-foreground">
            No topics found for "{search}".
          </div>
        )}
      </Container>
    </main>
  );
};
export default MockMaster;
