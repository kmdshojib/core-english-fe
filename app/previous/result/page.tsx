import { Suspense } from "react";

import { MockResultClient } from "@/app/mock-master/result/result-client";

export default function PreviousResultPage() {
  return (
    <Suspense fallback={null}>
      <MockResultClient
        homePath="/previous"
        examPath="/previous/exam"
        resultStoragePrefix="previous-year-result"
      />
    </Suspense>
  );
}
