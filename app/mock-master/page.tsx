"use client";
import { useMemo, useState } from "react";
import { Container } from "@/components/container";
import { QuizAction } from "@/components/custom-ui/quiz-action";
import TopicSearchHeader from "@/components/custom-ui/topic-search-header";
import TopicCard from "@/components/custom-ui/topic-card";
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
import { useRouter } from "next/navigation";
import { ClipboardList } from "lucide-react";

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

const MIN_QUESTIONS = 10;
const MAX_QUESTIONS = 50;
const QUESTION_STEP = 5;

const MockMaster = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [questionCount, setQuestionCount] = useState(25);
  const [starting, setStarting] = useState(false);
  const [startConfirmationOpen, setStartConfirmationOpen] = useState(false);

  const filteredTopics = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return MOCK_MASTER_TOPICS;
    }

    return MOCK_MASTER_TOPICS.filter((topic) =>
      topic.toLowerCase().includes(query),
    );
  }, [search]);

  const handleTopicSelect = (topic: string, selected: boolean) => {
    setSelectedTopics((current) => {
      if (selected) {
        return current.includes(topic) ? current : [...current, topic];
      }

      return current.filter((item) => item !== topic);
    });
  };

  const handleStartMock = () => {
    if (selectedTopics.length === 0) {
      return;
    }

    setStarting(true);

    const params = new URLSearchParams({
      topics: selectedTopics.join("||"),
      questions: String(questionCount),
      time: String(Math.max(10, questionCount)),
      negative: "true",
    });

    router.push(`/mock-master/exam?${params.toString()}`);
  };

  const handleQuestionCountChange = (count: number) => {
    setQuestionCount(Math.min(MAX_QUESTIONS, Math.max(MIN_QUESTIONS, count)));
  };

  return (
    <main
      className={`min-h-screen bg-background text-foreground ${
        selectedTopics.length > 0 ? "pb-72" : "pb-12"
      }`}
    >
      {selectedTopics.length > 0 && <div data-hide-bottom-nav="true" />}

      <Container size="sm">
        <TopicSearchHeader
          onBack={() => router.back()}
          value={search}
          onValueChange={setSearch}
          placeholder="Search mock master topics..."
        />

        <div className="grid gap-4">
          {filteredTopics.map((topic) => (
            <TopicCard
              variant="selectable"
              key={topic}
              title={topic}
              selected={selectedTopics.includes(topic)}
              onSelect={handleTopicSelect}
            />
          ))}
        </div>

        {filteredTopics.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-card/70 px-4 py-6 text-center text-sm text-muted-foreground">
            No topics found for "{search}".
          </div>
        )}
      </Container>

      {selectedTopics.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-50 px-4 py-2">
          <Container size="sm" className="px-0">
            <QuizAction
              questionCount={questionCount}
              selectedCount={selectedTopics.length}
              minQuestions={MIN_QUESTIONS}
              maxQuestions={MAX_QUESTIONS}
              onQuestionCountChange={handleQuestionCountChange}
              onDecreaseQuestions={() =>
                setQuestionCount((current) =>
                  Math.max(MIN_QUESTIONS, current - QUESTION_STEP),
                )
              }
              onIncreaseQuestions={() =>
                setQuestionCount((current) =>
                  Math.min(MAX_QUESTIONS, current + QUESTION_STEP),
                )
              }
              onStart={() => setStartConfirmationOpen(true)}
              loading={starting}
            />
          </Container>
        </div>
      )}

      <AlertDialog
        open={startConfirmationOpen}
        onOpenChange={setStartConfirmationOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia>
              <ClipboardList className="size-8" />
            </AlertDialogMedia>
            <AlertDialogTitle>মক পরীক্ষা শুরু করবেন?</AlertDialogTitle>
            <AlertDialogDescription>
              নির্বাচিত {selectedTopics.length}টি টপিক থেকে {questionCount}টি
              MCQ থাকবে। শুরু করলে টাইমার চালু হবে।
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={starting}>না</AlertDialogCancel>
            <AlertDialogAction onClick={handleStartMock} disabled={starting}>
              শুরু করো
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};
export default MockMaster;
