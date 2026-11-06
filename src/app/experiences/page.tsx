import { Suspense } from "react";
import { Explorer, ExplorerFallback } from "@/components/Explorer";

export const metadata = {
  title: "Experiences",
};

export default function ExperiencesPage() {
  return (
    <Suspense fallback={<ExplorerFallback />}>
      <Explorer />
    </Suspense>
  );
}
