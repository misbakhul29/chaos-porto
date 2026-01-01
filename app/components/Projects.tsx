"use client";

import { useState, useEffect } from "react";

// --- 1. DATA PROJECTS (Updated with EN/ID) ---
const PROJECTS = [
  {
    id: 1,
    number: "01",
    title: "VIRTUAL_DRESS",
    category: "#VDRESS",
    year: "2025",
    theme: "bg-electric-blue",
    text: "text-void-black",
    rotateClass: "",
    description_id: "Sebuah eksperimen gacha virtual dressing room. Menggabungkan PWA untuk performa mobile-native dan animasi frame-by-frame untuk pengalaman unboxing item yang dramatis.",
    description_en: "A virtual dressing room gacha experiment. Combining PWA for mobile-native performance and frame-by-frame animation for a dramatic item unboxing experience.",
    tech: ["Next.js", "PWA", "Framer Motion", "Tailwind"],
    links: { demo: "https://vdress.vercel.app/", github: "https://github.com/misbakhul29/vdress" }
  },
  {
    id: 2,
    number: "02",
    title: "MIKA_CHATBOT",
    category: "#CHATBOT",
    year: "2024",
    theme: "bg-hot-pink",
    text: "text-void-black",
    rotateClass: "md:mt-12 md:rotate-3",
    description_id: "Ekosistem AI Chatbot end-to-end ditenagai Google Gemini. Arsitektur 3-tier: REST API Server, Backoffice Dashboard untuk manajemen bot, dan Embeddable Widget yang ringan (~15KB).",
    description_en: "End-to-end AI Chatbot ecosystem powered by Google Gemini. 3-tier architecture: REST API Server, Backoffice Dashboard for bot management, and a lightweight Embeddable Widget (~15KB).",
    tech: ["Gemini AI", "Node.js", "MongoDB", "React", "Vite"],
    links: { demo: undefined, github: "https://github.com/misbakhul29/Mika" }
  },
  {
    id: 3,
    number: "03",
    title: "SCRAPER_BOT",
    category: "#SCRAPER",
    year: "2025",
    theme: "bg-acid-green",
    text: "text-void-black",
    rotateClass: "md:-mt-8 md:-rotate-2",
    hasPattern: true,
    description_id: "Engine web scraping otomatis yang berjalan di VPS. Menggunakan browser headless dengan teknik anti-bot detection canggih untuk mengumpulkan data pasar secara real-time.",
    description_en: "Automated web scraping engine running on VPS. Uses headless browsers with advanced anti-bot detection techniques to collect market data in real-time.",
    tech: ["Puppeteer", "Node.js", "Redis", "PM2"],
    links: { demo: "https://misbakhul.cloud/", github: "https://github.com/misbakhul29/scraper" }
  },
];

// --- 2. UI LABELS TRANSLATION ---
const UI_TEXT = {
  en: {
    view_project: "View Project",
    desc_title: "PROJECT_DESCRIPTION",
    live_demo: "LIVE DEMO",
    github_repo: "GITHUB REPO"
  },
  id: {
    view_project: "Lihat Proyek",
    desc_title: "DESKRIPSI_PROYEK",
    live_demo: "DEMO LANGSUNG",
    github_repo: "REPO GITHUB"
  }
};

export default function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [language, setLanguage] = useState<"en" | "id">("en"); // Default English

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const t = UI_TEXT[language];

  return (
    <section id="projects" className="px-4 pt-50 py-20 bg-void-black relative overflow-hidden">

      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <h2 className="text-center font-glitch text-5xl md:text-8xl mb-18 md:mb-24 relative inline-block w-full">
        <span className="relative z-10 text-dirty-white">VISUAL_NOISE</span>
        <span className="absolute top-2 left-1/2 -translate-x-1/2 text-hot-pink z-5 opacity-70 blur-sm select-none">
          VISUAL_NOISE
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto z-80">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className={`
              scribble-box aspect-square p-4 flex items-center justify-center overflow-hidden group cursor-pointer
              transform transition-all duration-300 z-80 hover:z-90 hover:scale-105 hover:cursor-cell hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]
              ${project.rotateClass}
            `}
          >
            <div className={`w-full h-full ${project.theme} flex items-center justify-center relative`}>
              <span className={`font-glitch text-9xl ${project.text} opacity-50 group-hover:scale-150 transition-transform duration-500`}>
                {project.number}
              </span>

              {project.id === 1 && (
                <div className="absolute inset-0 bg-black opacity-20 mix-blend-overlay"></div>
              )}
              {project.id === 2 && (
                <div className="absolute inset-0 bg-white opacity-20 mix-blend-difference"></div>
              )}
              {project.hasPattern && (
                <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" viewBox="0 0 100 100">
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="black" strokeWidth="0.5" />
                  </pattern>
                  <rect width="100" height="100" fill="url(#grid)" />
                </svg>
              )}

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-void-black/80 backdrop-blur-sm">
                <span className="font-(--font-space-grotesk) font-bold text-dirty-white text-xl uppercase tracking-widest border-b-2 border-acid-green pb-1">
                  {t.view_project}
                </span>
              </div>
            </div>

            <div className={`
                absolute bg-void-black text-dirty-white font-mono text-xs px-2 py-1 transform 
                ${project.id === 1 ? 'bottom-2 right-2 -rotate-6' : ''}
                ${project.id === 2 ? 'top-2 left-2 rotate-12' : ''}
                ${project.id === 3 ? 'bottom-10 -right-2 -rotate-90' : ''}
            `}>
              {project.category}
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-99999 flex items-center justify-center p-4">

          <div
            className="absolute inset-0 bg-void-black/95 backdrop-blur-md cursor-pointer animate-in fade-in duration-300"
            onClick={() => setSelectedProject(null)}
          >
            <div className="noise-overlay opacity-10"></div>
          </div>

          <div className="relative w-full max-w-4xl bg-void-black border-2 border-dirty-white shadow-[10px_10px_0px_var(--color-acid-green)] animate-in zoom-in-95 duration-300 flex flex-col md:flex-row overflow-hidden max-h-[90vh]">
            <div className="absolute top-6 right-20 z-50">
              <button
                onClick={() => setLanguage(prev => prev === "en" ? "id" : "en")}
                className="font-mono text-xs font-bold text-dirty-white hover:text-acid-green transition-colors border border-dirty-white/30 px-3 py-2 bg-void-black/50 backdrop-blur-sm cursor-pointer"
              >
                [ <span className={language === "en" ? "text-acid-green" : "text-dirty-white/50"}>EN</span> / <span className={language === "id" ? "text-acid-green" : "text-dirty-white/50"}>ID</span> ]
              </button>
            </div>
            
            <div className={`w-full md:w-1/3 ${selectedProject.theme} p-8 flex flex-col justify-between relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply"></div>

              <span className="font-glitch text-8xl text-void-black opacity-30 absolute -top-4 -left-4">
                {selectedProject.number}
              </span>

              <div className="relative z-10 mt-10">
                <h3 className="font-black text-4xl uppercase text-void-black leading-none mb-2">
                  {selectedProject.title.split('_')[0]}<br />
                  {selectedProject.title.split('_')[1]}
                </h3>
                <span className="font-mono text-xs bg-void-black text-dirty-white px-2 py-1">
                  YEAR: {selectedProject.year}
                </span>
              </div>

              <div className="relative z-10 mt-auto pt-8">
                <div className="w-10 h-1 bg-void-black mb-2"></div>
                <p className="font-mono text-xs text-void-black font-bold">
                  CATEGORY: {selectedProject.category}
                </p>
              </div>
            </div>

            <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col bg-void-black text-dirty-white relative">
              <div className="tape top-4 right-10 rotate-3"></div>

              <h4 className="text-xl font-bold text-acid-green mb-4 flex items-center gap-2">
                <span className="animate-pulse">_</span> {t.desc_title}
              </h4>

              <p className="font-(--font-space-grotesk) text-lg leading-relaxed mb-8 text-dirty-white/90">
                {language === "en" ? selectedProject.description_en : selectedProject.description_id}
              </p>

              <div className="mb-8">
                <h4 className="text-sm font-bold text-hot-pink mb-3 font-mono">
                  {`// TECH_STACK`}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map(tech => (
                    <span key={tech} className="border border-dirty-white/30 px-3 py-1 text-sm font-mono hover:bg-dirty-white hover:text-void-black transition-colors cursor-crosshair">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto grid grid-cols-2 gap-4">
                <button disabled={!selectedProject.links.demo} onClick={() => window.open(selectedProject.links.demo)} className="glitch-btn hover:text-(--electric-blue) hover:cursor-cell py-3 text-sm tracking-widest">
                  {t.live_demo}
                </button>
                <button disabled={!selectedProject.links.github} onClick={() => window.open(selectedProject.links.github)} className="border-2 border-dirty-white text-dirty-white hover:bg-dirty-white hover:text-void-black hover:cursor-cell py-3 text-sm font-bold uppercase transition-colors tracking-widest">
                  {t.github_repo}
                </button>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-dirty-white hover:text-hot-pink transition-colors p-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}