export type QuizSubject = {
  title: string;
  progress: {
    completed: number;
    total: number;
  };
  percentage: number;
  subtopics: number;
  questions: number;
};

export type TopicQuestion = {
  id: number;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  source?: string;
};

export type QuestionSource = "practice" | "previous" | "all";

export const TOPIC_EXPERT_SUBJECTS: QuizSubject[] = [
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

export const PREVIOUS_YEAR_SUBJECTS: QuizSubject[] = [
  {
    title: "Noun",
    progress: { completed: 8, total: 24 },
    percentage: 33,
    subtopics: 0,
    questions: 24,
  },
  {
    title: "Verb",
    progress: { completed: 11, total: 30 },
    percentage: 37,
    subtopics: 0,
    questions: 30,
  },
  {
    title: "Tense",
    progress: { completed: 14, total: 26 },
    percentage: 54,
    subtopics: 0,
    questions: 26,
  },
];

const QUESTION_BANK: TopicQuestion[] = [
  {
    id: 1,
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
    source: "Topic Practice",
  },
  {
    id: 2,
    prompt: "Identify the noun in the sentence: The teacher smiled.",
    options: ["The", "teacher", "smiled", "sentence"],
    answer: 1,
    explanation:
      "Teacher is the naming word here, so it functions as the noun in the sentence.",
    source: "Topic Practice",
  },
  {
    id: 3,
    prompt: "Select the correct synonym of 'rapid'.",
    options: ["slow", "quick", "weak", "late"],
    answer: 1,
    explanation:
      "Rapid means fast or quick, so 'quick' is the closest synonym.",
    source: "Topic Practice",
  },
  {
    id: 4,
    prompt: "Which one is a modal auxiliary?",
    options: ["can", "run", "book", "quickly"],
    answer: 0,
    explanation:
      "'Can' is a modal auxiliary because it helps express ability or possibility.",
    source: "Topic Practice",
  },
  {
    id: 5,
    prompt: "Choose the correct plural form of 'child'.",
    options: ["childs", "childes", "children", "childrens"],
    answer: 2,
    explanation: "'Children' is the irregular plural form of 'child'.",
    source: "Topic Practice",
  },
];

const PREVIOUS_YEAR_BANK: TopicQuestion[] = [
  {
    id: 1,
    prompt:
      "Which of the following sentences uses the correct form of the noun?",
    options: [
      "The informations are incorrect.",
      "The information is incorrect.",
      "The informations is incorrect.",
      "An information are incorrect.",
    ],
    answer: 1,
    explanation:
      '"Information" is an uncountable noun and does not take a plural form or the article "an".',
    source: "BCS Previous Year",
  },
  {
    id: 2,
    prompt: "Choose the correct sentence.",
    options: [
      "She don't know the answer.",
      "She doesn't knows the answer.",
      "She doesn't know the answer.",
      "She do not knows the answer.",
    ],
    answer: 2,
    explanation:
      'With third-person singular subjects, use "doesn\'t" with the base form of the verb.',
    source: "Bank Previous Year",
  },
  {
    id: 3,
    prompt: "Which sentence is in the Present Perfect Tense?",
    options: [
      "He is writing a letter.",
      "He wrote a letter.",
      "He has written a letter.",
      "He will write a letter.",
    ],
    answer: 2,
    explanation: 'Present Perfect is formed with "has/have + past participle".',
    source: "Primary Previous Year",
  },
];

export function slugifyTopic(topic: string) {
  return topic.toLowerCase().replace(/\s+/g, "-");
}

export function formatTopicSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function buildExamUrl(examPath: string, topic: string, questions = 25) {
  const params = new URLSearchParams({
    topics: topic,
    questions: String(questions),
    time: String(Math.max(10, questions)),
    negative: "true",
  });

  return `${examPath}?${params.toString()}`;
}

export function buildMockExamUrl(topic: string, questions = 25) {
  return buildExamUrl("/mock-master/exam", topic, questions);
}

export function getTopicQuestions(_topic: string, previousYear = false) {
  const bank = previousYear ? PREVIOUS_YEAR_BANK : QUESTION_BANK;

  return Array.from({ length: 10 }, (_, index) => {
    const base = bank[index % bank.length];

    return {
      ...base,
      id: index + 1,
      prompt: base.prompt,
    };
  });
}

export function getMockExamQuestions(
  topics: string[],
  questionCount: number,
  source: QuestionSource = "all",
) {
  const bank =
    source === "practice"
      ? QUESTION_BANK
      : source === "previous"
        ? PREVIOUS_YEAR_BANK
        : [...QUESTION_BANK, ...PREVIOUS_YEAR_BANK];

  return Array.from({ length: questionCount }, (_, index) => {
    const base = bank[index % bank.length];
    const topic = topics[index % topics.length];

    return {
      ...base,
      id: index + 1,
      topic,
      prompt: `${base.prompt} (${topic})`,
    };
  });
}
