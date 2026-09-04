import { Metadata } from "next";
import { notFound } from "next/navigation";
import projects from "../projects";
import ProjectDetailClient from "./page.client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | Misbakhul Munir",
      description: "The requested project vault could not be found.",
    };
  }

  const title = `${project.title.replace("_", " ")} | Misbakhul Munir Project`;
  const description = project.description_en;
  const url = `https://www.misbakhul.com/projects/${project.slug}`;
  const ogImage = project.media?.[0]?.url || "/og-image.png";

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description_en,
    applicationCategory: project.category.replace("#", ""),
    operatingSystem: "Web / Linux",
    author: {
      "@type": "Person",
      name: "Misbakhul Munir",
      url: "https://www.misbakhul.com",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetailClient project={project} allProjects={projects} />
    </>
  );
}
