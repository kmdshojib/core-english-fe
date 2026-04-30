import { Suspense } from "react";

import { MockExamClient } from "@/app/mock-master/exam/mock-exam-client";

export default function TopicExpertExamPage() {
  return (
    <Suspense fallback={null}>
      <MockExamClient
        title="প্র্যাকটিস কুইজ"
        homePath="/topic-expert"
        resultPath="/topic-expert/result"
        resultStoragePrefix="topic-expert-result"
        questionSource="practice"
      />
    </Suspense>
  );
}
