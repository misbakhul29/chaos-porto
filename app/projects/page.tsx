import { Metadata } from "next";
import ProjectsPageClient from "./page.client";

export const metadata: Metadata = {
  title: "PROJECTS // CHAOS_PORTO",
  description:
    "Database and showcase of all the chaos engineering, full-stack, and cyber-glitch systems built by Misbakhul.",
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
