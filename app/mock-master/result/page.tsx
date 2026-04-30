import { Suspense } from "react";
import { MockResultClient } from "./result-client";

export default function MockResultPage() {
  return (
    <Suspense fallback={null}>
      <MockResultClient />
    </Suspense>
  );
}
