import { Metadata } from "next";
import ProjectsPageClient from "./page.client";

export const metadata: Metadata = {
  title: "Misbakhul Munir Projects | Fullstack Web Developer",
  description:
    "Explore the database and showcase of all the chaos engineering, full-stack, and cyber-glitch systems built by Misbakhul Munir.",
  alternates: {
    canonical: "https://www.misbakhul.com/projects",
  },
  openGraph: {
    title: "Misbakhul Munir Projects | Fullstack Web Developer",
    description:
      "Explore the database and showcase of all the chaos engineering, full-stack, and cyber-glitch systems built by Misbakhul Munir.",
    url: "https://www.misbakhul.com/projects",
  }
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
