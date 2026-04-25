import { Suspense } from "react";
import { MockExamClient } from "./mock-exam-client";

export default function MockExamPage() {
  return (
    <Suspense fallback={null}>
      <MockExamClient />
    </Suspense>
  );
}
