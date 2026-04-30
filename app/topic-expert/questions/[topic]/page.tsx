"use client";

import { useParams } from "next/navigation";

import { TopicQuestionList } from "@/components/custom-ui/topic-question-list";
import { formatTopicSlug } from "@/lib/quiz-content";

export default function TopicExpertQuestionsPage() {
  const params = useParams<{ topic: string }>();
  const topic = formatTopicSlug(params.topic);

  return <TopicQuestionList topic={topic} />;
}
