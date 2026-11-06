import { Suspense } from "react";
import { Explorer, ExplorerFallback } from "@/components/Explorer";

export const metadata = {
  title: "Experiences",
  description:
    "Search 100 travel experiences by title, category, and destination. Active filters stay in the address.",
};

export default function ExperiencesPage() {
  return (
    <Suspense fallback={<ExplorerFallback />}>
      <Explorer />
    </Suspense>
  );
}
