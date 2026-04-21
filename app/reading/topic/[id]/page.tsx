"use client";

import { use, useState } from "react";
import { Container } from "@/components/container";
import BackButton from "@/components/custom-ui/back-button";
import { QuizOption, QuizQuestion } from "@/components/custom-ui/quiz-option";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Lightbulb,
  FileText,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

function formatTopicLabel(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/* ------------------------------------------------------------------ */
/* Static data – replace with API calls later                          */
/* ------------------------------------------------------------------ */

const READING_CONTENT: Record<
  string,
  { title: string; body: string; keyPoints: string[] }
> = {
  default: {
    title: "Topic Overview",
    body: `A solid understanding of this topic is essential for mastering English grammar. This section walks you through the core concepts, rules, and common exceptions that appear frequently in competitive exams.\n\nStudy each rule carefully, pay attention to the examples, and practice the previous year questions below to solidify your understanding.`,
    keyPoints: [
      "Understand the definition and core usage",
      "Memorise the key rules and exceptions",
      "Practice with real exam-style questions",
      "Review explanations for every answer",
    ],
  },
  noun: {
    title: "Noun",
    body: `A noun is a word that names a person, place, thing, or idea. Nouns are one of the most fundamental parts of speech in English and appear in virtually every sentence.\n\nNouns can function as the subject of a sentence, the object of a verb, or the object of a preposition. They can be singular or plural, and they can be concrete (something you can touch) or abstract (something you can only think about).`,
    keyPoints: [
      "Types: Common, Proper, Abstract, Collective, Material",
      "Singular & Plural – regular and irregular forms",
      "Countable vs. Uncountable nouns",
      "Noun as Subject, Object, and Complement",
    ],
  },
  verb: {
    title: "Verb",
    body: `A verb is a word that expresses action, occurrence, or a state of being. Verbs are the heart of every English sentence; without them, no complete thought can be expressed.\n\nVerbs change form to show tense (past, present, future), voice (active, passive), and mood (indicative, imperative, subjunctive). Mastery of verbs is crucial for all aspects of English grammar.`,
    keyPoints: [
      "Main verbs, Auxiliary verbs, and Modal verbs",
      "Transitive vs. Intransitive verbs",
      "Finite vs. Non-finite verbs",
      "Regular & Irregular verb forms",
    ],
  },
  tenses: {
    title: "Tenses",
    body: `Tense is the grammatical concept that locates an event or state in time. English has three primary tenses — Past, Present, and Future — each with four aspects: Simple, Continuous, Perfect, and Perfect Continuous.\n\nMastering tenses is essential for writing correct sentences, scoring in grammar MCQs, and understanding reading comprehension passages.`,
    keyPoints: [
      "12 tense structures in total (3 × 4)",
      "Signal words for each tense",
      "Active and Passive voice transformations",
      "Common mistakes in tense usage",
    ],
  },
};

const PREV_YEAR_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question:
      "Which of the following sentences uses the correct form of the noun?",
    options: [
      { label: "A", text: "The informations are incorrect." },
      { label: "B", text: "The information is incorrect." },
      { label: "C", text: "The informations is incorrect." },
      { label: "D", text: "An information are incorrect." },
    ],
    correctOptionId: "B",
    explanation:
      '"Information" is an uncountable noun and does not take a plural form or the article "an".',
  },
  {
    id: 2,
    question: "Choose the correct sentence:",
    options: [
      { label: "A", text: "She don't know the answer." },
      { label: "B", text: "She doesn't knows the answer." },
      { label: "C", text: "She doesn't know the answer." },
      { label: "D", text: "She do not knows the answer." },
    ],
    correctOptionId: "C",
    explanation:
      'With third-person singular subjects (he, she, it), we use "doesn\'t" + base form of the verb.',
  },
  {
    id: 3,
    question: "Which sentence is in the Present Perfect Tense?",
    options: [
      { label: "A", text: "He is writing a letter." },
      { label: "B", text: "He wrote a letter." },
      { label: "C", text: "He has written a letter." },
      { label: "D", text: "He will write a letter." },
    ],
    correctOptionId: "C",
    explanation:
      'Present Perfect is formed with "has/have + past participle". "Has written" fits this structure.',
  },
];

/* ------------------------------------------------------------------ */
/* Sub-components                                                       */
/* ------------------------------------------------------------------ */

function SectionHeader({
  icon,
  title,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  accent: string;
}) {
  return (
    <div className={cn("flex items-center gap-3 mb-5")}>
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
          accent
        )}
      >
        {icon}
      </div>
      <h2 className="text-lg font-bold tracking-tight text-foreground">
        {title}
      </h2>
    </div>
  );
}

function ReadingSection({
  content,
}: {
  content: { title: string; body: string; keyPoints: string[] };
}) {
  const paragraphs = content.body.split("\n\n");

  return (
    <section className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      {/* Card accent strip */}
      <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-primary to-indigo-500" />

      <div className="p-5 sm:p-6 space-y-5">
        <SectionHeader
          icon={<BookOpen className="h-4 w-4 text-violet-400" />}
          title="Reading Material"
          accent="bg-violet-500/10"
        />

        {/* Body text */}
        <div className="space-y-3">
          {paragraphs.map((para, i) => (
            <p
              key={i}
              className="text-sm sm:text-base leading-relaxed text-foreground/80"
            >
              {para}
            </p>
          ))}
        </div>

        {/* Key Points */}
        <div className="rounded-xl bg-primary/5 border border-primary/15 p-4 space-y-2">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Key Points
            </span>
          </div>
          <ul className="space-y-2">
            {content.keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary">
                  {i + 1}
                </span>
                <span className="text-sm text-foreground/80 leading-snug">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function PreviousQuestionsSection({
  questions,
}: {
  questions: QuizQuestion[];
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <section className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400" />

      <div className="p-5 sm:p-6">
        <button
          onClick={() => setExpanded((e) => !e)}
          className="w-full flex items-center justify-between group"
          aria-expanded={expanded}
          id="prev-questions-toggle"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
              <FileText className="h-4 w-4 text-amber-400" />
            </div>
            <div className="text-left">
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                Previous Year Questions
              </h2>
              <p className="text-xs text-muted-foreground">
                {questions.length} questions from past exams
              </p>
            </div>
          </div>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors group-hover:border-foreground/30 group-hover:text-foreground">
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </div>
        </button>

        {expanded && (
          <div className="mt-5 space-y-4">
            {questions.map((q) => (
              <QuizOption key={q.id} question={q} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

type TopicPageProps = {
  params: Promise<{ id: string }>;
};

const TopicPage = ({ params }: TopicPageProps) => {
  const { id } = use(params);
  const router = useRouter();

  const label = formatTopicLabel(id);
  const content = READING_CONTENT[id] ?? {
    ...READING_CONTENT.default,
    title: label,
  };

  return (
    <main className="min-h-screen bg-background text-foreground pb-6">
      <Container size="sm">
        {/* Back */}
        <BackButton onPress={() => router.back()} />

        {/* Hero Banner */}
        <div className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-violet-500/10 to-indigo-500/10 border border-primary/20 p-5 sm:p-6">
          {/* decorative blobs */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-indigo-500/10 blur-2xl" />

          <div className="relative flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/20 ring-1 ring-primary/30">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Reading
              </p>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {label}
              </h1>
            </div>
          </div>

          {/* progress pills */}
          <div className="relative mt-4 flex flex-wrap gap-2">
            {["Concepts", "Examples", "Practice"].map((tag, i) => (
              <span
                key={tag}
                className={cn(
                  "rounded-full px-3 py-0.5 text-xs font-medium",
                  i === 0
                    ? "bg-primary/20 text-primary"
                    : "bg-foreground/5 text-muted-foreground"
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-5">
          <ReadingSection content={content} />
          <PreviousQuestionsSection questions={PREV_YEAR_QUESTIONS} />
        </div>

        {/* Take Exam CTA */}
        <div className="mt-8 mb-2">
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-violet-500/10 to-indigo-500/10 p-5 sm:p-6">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            <div className="relative flex flex-col items-center gap-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 ring-1 ring-primary/30">
                <ClipboardList className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">
                  Ready to Test Yourself?
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Take the full exam on <span className="font-medium text-foreground">{label}</span> and track your score.
                </p>
              </div>
              <Button
                id="take-exam-btn"
                size="lg"
                className="w-full max-w-xs gap-2 rounded-xl font-semibold shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0"
                disabled
                title="Coming soon"
              >
                <ClipboardList className="h-4 w-4" />
                Take Exam
                <span className="ml-1 rounded-full bg-primary-foreground/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  Soon
                </span>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default TopicPage;
