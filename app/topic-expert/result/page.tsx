import { Suspense } from "react";

import { MockResultClient } from "@/app/mock-master/result/result-client";

export default function TopicExpertResultPage() {
  return (
    <Suspense fallback={null}>
      <MockResultClient
        homePath="/topic-expert"
        examPath="/topic-expert/exam"
        resultStoragePrefix="topic-expert-result"
      />
    </Suspense>
  );
}
