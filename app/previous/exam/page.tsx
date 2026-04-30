import { Suspense } from "react";

import { MockExamClient } from "@/app/mock-master/exam/mock-exam-client";

export default function PreviousExamPage() {
  return (
    <Suspense fallback={null}>
      <MockExamClient
        title="Previous Year Quiz"
        homePath="/previous"
        resultPath="/previous/result"
        resultStoragePrefix="previous-year-result"
        questionSource="previous"
      />
    </Suspense>
  );
}
