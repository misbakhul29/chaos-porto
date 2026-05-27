"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Tape from "@/app/components/ui/Tape";
import Button from "@/app/components/ui/Button";
import Modal from "@/app/components/ui/Modal";
import { useLanguage } from "@/app/context/LanguageContext";

interface JourneyItem {
  year: string;
  title_id: string;
  title_en: string;
  desc_id: string;
  desc_en: string;
  color: string;
  text: string;
  rotate: string;
  details_id?: string;
  details_en?: string;
}

const JOURNEY_DATA: JourneyItem[] = [
  {
    year: "2019",
    title_id: "Awal Ketertarikan",
    title_en: "The First Spark",
    desc_id: "Mulai belajar pemrograman secara otodidak. Mempelajari dasar-dasar HTML, CSS, dan logika JavaScript melalui tutorial online dan dokumentasi gratis.",
    desc_en: "Began learning programming autodidactically. Studied the fundamentals of HTML, CSS, and JavaScript logic through online tutorials and free documentation.",
    color: "bg-acid-green",
    text: "text-void-black",
    rotate: "-rotate-2",
    details_id: "Perjalanan dimulai dari rasa penasaran yang mendalam. Mempelajari sintaks HTML/CSS dasar di warnet dan laptop dengan spesifikasi rendah.\n\n![Belajar Coding](/og-image.png)\n\n**Milestone Utama:**\n- Memahami dasar DOM manipulation.\n- Membuat halaman web statis pertama.\n- Belajar menggunakan Git & GitHub.",
    details_en: "The journey started out of deep curiosity. Learning basic HTML/CSS syntax at internet cafes and on a low-spec laptop.\n\n![Learning to Code](/og-image.png)\n\n**Key Milestones:**\n- Understanding basic DOM manipulation.\n- Creating the first static web page.\n- Learning to use Git & GitHub."
  },
  {
    year: "2021",
    title_id: "Eksplorasi Modern Web",
    title_en: "Modern Web Exploration",
    desc_id: "Beralih ke pengembangan web modern dengan React.js dan Tailwind CSS. Mulai membangun dan meluncurkan proyek-proyek portofolio sederhana di GitHub.",
    desc_en: "Transitioned to modern web development with React.js and Tailwind CSS. Started building and deploying simple portfolio projects on GitHub.",
    color: "bg-electric-blue",
    text: "text-void-black",
    rotate: "rotate-1",
    details_id: "Mulai meninggalkan teknik web tradisional dan beralih ke Component-Based Architecture menggunakan React.js. Menemukan kemudahan styling dengan Tailwind CSS.\n\n![Eksplorasi Framework](/og-image.png)\n\n**Milestone Utama:**\n- Menguasai React State, Props, dan Hook Lifecycle.\n- Memahami konsep SPA (Single Page Application).\n- Mendeploy project pertama di Vercel dan Netlify.",
    details_en: "Began leaving traditional web techniques behind and moved towards Component-Based Architecture using React.js. Discovered the ease of styling with Tailwind CSS.\n\n![Framework Exploration](/og-image.png)\n\n**Key Milestones:**\n- Mastering React State, Props, and Hook Lifecycles.\n- Understanding SPA (Single Page Application) concepts.\n- Deploying the first projects to Vercel and Netlify."
  },
  {
    year: "2023",
    title_id: "Menguasai Next.js",
    title_en: "Mastering Next.js",
    desc_id: "Fokus pada pengembangan aplikasi Next.js dengan App Router, keamanan tipe TypeScript, serta optimasi performa modern.",
    desc_en: "Focusing on Next.js application development with App Router, TypeScript type safety, and modern performance optimization.",
    color: "bg-hot-pink",
    text: "text-void-black",
    rotate: "-rotate-1",
    details_id: "Mendalami framework Next.js untuk membangun aplikasi web yang cepat, responsif, dan SEO-friendly.\n\n![Menguasai Next.js](/og-image.png)\n\n**Milestone Utama:**\n- Memahami arsitektur Next.js Server Components.\n- Optimasi SEO, Core Web Vitals, dan performa halaman.\n- Implementasi routing dinamis dan rendering hybrid.",
    details_en: "Diving deep into Next.js framework to build fast, responsive, and SEO-friendly web applications.\n\n![Mastering Next.js](/og-image.png)\n\n**Key Milestones:**\n- Understanding Next.js Server Components architecture.\n- Optimizing SEO, Core Web Vitals, and page performance.\n- Implementing dynamic routing and hybrid rendering."
  },
  {
    year: "2025 - Sekarang",
    title_id: "Junior Full Stack Developer",
    title_en: "Junior Full Stack Developer",
    desc_id: "Mulai belajar bagaimana membuat REST API yang baik menggunakan Node.js dan Golang, serta mengelola containerization menggunakan Docker.",
    desc_en: "Started learning how to build good REST APIs using Node.js and Golang, and managing containerization using Docker.",
    color: "bg-hazard-orange",
    text: "text-void-black",
    rotate: "rotate-2",
    details_id: "Memulai peran profesional sebagai Junior Full Stack Developer, berfokus pada integrasi backend dan konsistensi deployment.\n\n![Junior Fullstack](/og-image.png)\n\n**Milestone Utama:**\n- Mendesain REST API yang andal dengan Node.js dan Golang.\n- Mengintegrasikan PostgreSQL untuk manajemen database relasional.\n- Menggunakan Docker untuk standardisasi environment pengujian dan produksi.",
    details_en: "Beginning a professional role as a Junior Full Stack Developer, focusing on backend integration and deployment consistency.\n\n![Junior Fullstack](/og-image.png)\n\n**Key Milestones:**\n- Designing reliable REST APIs with Node.js and Golang.\n- Integrating PostgreSQL for relational database management.\n- Using Docker for test and production environment standardization."
  }
];

function renderMarkdown(text: string | undefined): string {
  if (!text) return "";
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<div class="my-6 border-2 border-dirty-white shadow-[6px_6px_0px_var(--color-hot-pink)] overflow-hidden"><img src="$2" alt="$1" class="w-full h-auto object-cover" /></div>');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="underline text-electric-blue hover:text-hot-pink font-bold">$1</a>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-acid-green">$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em class="text-electric-blue">$1</em>');
  html = html.replace(/- ([^\n]+)/g, '<li class="ml-4 list-disc text-dirty-white/90">$1</li>');
  html = html.replace(/\n/g, '<br />');

  return html;
}

export default function JourneyTimeline() {
  const { language, setLanguage } = useLanguage();

  return (
    <section className="min-h-screen pt-32 pb-24 px-4 relative overflow-hidden bg-void-black flex flex-col justify-center">
      <div className="noise-overlay absolute! opacity-5"></div>

      <div className="container mx-auto max-w-4xl relative z-20">
        <div className="flex justify-between items-center mb-16">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-sm border-2 border-dirty-white px-4 py-2 hover:bg-dirty-white hover:text-void-black transition-colors hover:cursor-cell"
          >
            <ArrowLeft size={16} />
            <span>[ RETURN_HOME ]</span>
          </Link>

          <Button
            variant="retro"
            onClick={() => setLanguage(prev => prev === "en" ? "id" : "en")}
            className="text-xs px-3 py-2"
          >
            [ <span className={language === "en" ? "text-acid-green" : "text-dirty-white/50"}>EN</span> / <span className={language === "id" ? "text-acid-green" : "text-dirty-white/50"}>ID</span> ]
          </Button>
        </div>

        <h1 className="text-center font-glitch text-5xl md:text-8xl mb-24 relative inline-block w-full">
          <span className="sr-only">Misbakhul Munir Life Journey Timeline</span>
          <span className="relative z-10 text-dirty-white">LIFE_TIMELINE</span>
          <span className="absolute top-2 left-1/2 -translate-x-1/2 text-electric-blue z-5 opacity-70 blur-sm select-none">
            LIFE_TIMELINE
          </span>
        </h1>

        <div className="relative border-l-4 border-dirty-white ml-4 md:ml-32 space-y-16">
          {JOURNEY_DATA.map((item, idx) => {
            const itemTitle = language === "en" ? item.title_en : item.title_id;
            const itemDesc = language === "en" ? item.desc_en : item.desc_id;

            return (
              <div key={idx} className="relative pl-8 md:pl-16 group">
                <div className="absolute left-[-14px] top-1.5 w-6 h-6 rounded-none border-2 border-dirty-white bg-void-black flex items-center justify-center group-hover:border-acid-green transition-colors">
                  <div className="w-2 h-2 bg-dirty-white group-hover:bg-acid-green transition-colors"></div>
                </div>

                <div className="absolute left-0 -top-8 hidden md:block font-marker text-4xl text-dirty-white/30 -translate-x-32 group-hover:text-dirty-white transition-colors duration-300">
                  {item.year.split(" ")[0]}
                </div>

                <div
                  className={`relative ${item.rotate} bg-void-black border-2 border-dirty-white p-6 md:p-8 shadow-[6px_6px_0px_rgba(255,255,255,0.15)] group-hover:shadow-[10px_10px_0px_var(--color-acid-green)] group-hover:rotate-0 transition-all duration-300 cursor-cell`}
                >
                  <Tape />

                  <div className="md:hidden font-marker text-2xl text-hot-pink mb-2">
                    {item.year}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-sans font-black text-xl md:text-2xl uppercase tracking-tight text-dirty-white group-hover:text-acid-green transition-colors">
                      {itemTitle}
                    </h2>
                    <span className={`hidden md:inline-block font-mono text-xs px-2 py-1 ${item.color} ${item.text} font-bold`}>
                      {item.year}
                    </span>
                  </div>

                  <p className="font-sans text-sm md:text-base leading-relaxed text-dirty-white/80">
                    {itemDesc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
