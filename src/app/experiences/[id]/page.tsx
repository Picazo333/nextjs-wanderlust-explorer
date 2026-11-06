import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExperienceDetail } from "@/components/ExperienceDetail";
import { experiences, getExperienceById } from "@/data/experiences";

interface ExperiencePageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return experiences.map((experience) => ({ id: experience.id }));
}

export async function generateMetadata({
  params,
}: ExperiencePageProps): Promise<Metadata> {
  const { id } = await params;
  const experience = getExperienceById(id);
  if (!experience) {
    return { title: "Experience not found" };
  }
  return {
    title: experience.title,
    description: experience.description,
  };
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const { id } = await params;
  const experience = getExperienceById(id);
  if (!experience) {
    notFound();
  }
  return <ExperienceDetail experience={experience} />;
}
