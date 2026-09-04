"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Tape from "@/components/ui/Tape";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useLanguage } from "@/lib/context/LanguageContext";
import { Project, ProjectMedia } from "../projects";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  Calendar,
  Layers,
  Cpu,
  ShieldCheck,
  Play,
  Maximize2,
  CheckCircle2,
  Terminal,
  Film,
} from "lucide-react";

interface ProjectDetailClientProps {
  project: Project;
  allProjects: Project[];
}

const UI_TEXT = {
  en: {
    backToVault: "RETURN_TO_VAULT",
    liveDemo: "LAUNCH_DEMO",
    githubRepo: "SOURCE_CODE",
    statusBadge: "OPERATIONAL",
    sysSpecs: "SYSTEM_SPECIFICATIONS",
    techStack: "CORE_COMPONENTS",
    archOverview: "ARCHITECTURE_BLUEPRINT",
    keyFeatures: "KEY_CAPABILITIES",
    highlights: "ENGINEERING_HIGHLIGHTS",
    mediaGallery: "VISUAL_SURVEILLANCE_MEDIA",
    allProjects: "INDEXED_MODULES",
    prevProject: "PREV_MODULE",
    nextProject: "NEXT_MODULE",
    noMedia: "NO_RECORDED_STREAM",
    mediaCaption: "FRAME_INSPECTION",
    zoomImage: "EXPAND_VIEW",
    playVideo: "PLAY_STREAM",
    categoryLabel: "CATEGORY",
    yearLabel: "YEAR",
  },
  id: {
    backToVault: "KEMBALI_KE_VAULT",
    liveDemo: "BUKA_DEMO",
    githubRepo: "KODE_SUMBER",
    statusBadge: "OPERASIONAL",
    sysSpecs: "SPESIFIKASI_SISTEM",
    techStack: "KOMPONEN_UTAMA",
    archOverview: "BLUEPRINT_ARSITEKTUR",
    keyFeatures: "FITUR_UTAMA",
    highlights: "SOROTAN_ENGINEERING",
    mediaGallery: "DOKUMENTASI_VISUAL_MEDIA",
    allProjects: "MODUL_TERINDEKS",
    prevProject: "MODUL_SEBELUMNYA",
    nextProject: "MODUL_SELANJUTNYA",
    noMedia: "TIDAK_ADA_REKAMAN",
    mediaCaption: "INSPEKSI_FRAME",
    zoomImage: "PERBESAR",
    playVideo: "PUTAR_VIDEO",
    categoryLabel: "KATEGORI",
    yearLabel: "TAHUN",
  },
};

export default function ProjectDetailClient({
  project,
  allProjects,
}: ProjectDetailClientProps) {
  const { language, setLanguage } = useLanguage();
  const t = UI_TEXT[language];

  const defaultMediaList: ProjectMedia[] =
    project.media && project.media.length > 0
      ? project.media
      : [
        {
          type: "image",
          url: "/og-image.png",
          caption_en: `${project.title} Interface Preview`,
          caption_id: `Pratinjau Tampilan ${project.title}`,
        },
      ];

  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const activeMedia = defaultMediaList[selectedMediaIndex] || defaultMediaList[0];

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject =
    currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  const description =
    language === "en" ? project.description_en : project.description_id;
  const architecture =
    language === "en" ? project.architecture_en : project.architecture_id;
  const keyFeatures =
    language === "en" ? project.keyFeatures_en : project.keyFeatures_id;
  const highlights =
    language === "en" ? project.highlights_en : project.highlights_id;

  return (
    <div className="relative min-h-screen w-full text-dirty-white overflow-x-hidden flex flex-col justify-between">
      <Header />

      <main className="relative z-20 pt-28 md:pt-36 pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
        {/* TOP BAR / NAVIGATION */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-dirty-white/15">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs md:text-sm border border-dirty-white/30 px-3 py-2 bg-void-black/60 hover:bg-dirty-white hover:text-void-black transition-all cursor-cell group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>[ {t.backToVault} ]</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block font-mono text-[10px] text-dirty-white/40">
              HEX: 0x00F{project.id}82BA
            </span>
            <Button
              variant="retro"
              onClick={() => setLanguage((prev) => (prev === "en" ? "id" : "en"))}
              className="text-xs px-3 py-1.5"
            >
              [ <span className={language === "en" ? "text-acid-green font-bold" : "text-dirty-white/50"}>EN</span> /{" "}
              <span className={language === "id" ? "text-acid-green font-bold" : "text-dirty-white/50"}>ID</span> ]
            </Button>
          </div>
        </div>

        {/* HERO HEADER SECTION */}
        <section className="relative mb-12">
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4 font-mono text-[10px] md:text-xs">
            <span className="bg-acid-green text-void-black font-bold px-2 py-0.5 tracking-widest">
              ID_SYS: #{project.number}
            </span>
            <span className="border border-hot-pink text-hot-pink px-2 py-0.5 font-bold">
              {project.category}
            </span>
            <span className="border border-electric-blue/40 text-electric-blue px-2 py-0.5 flex items-center gap-1.5">
              <Calendar size={12} />
              {project.year}
            </span>
            <span className="border border-acid-green/40 bg-acid-green/10 text-acid-green px-2 py-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-acid-green rounded-full animate-ping"></span>
              {t.statusBadge}
            </span>
          </div>

          <div className="relative">
            <h1 className="font-glitch text-4xl sm:text-6xl md:text-8xl text-dirty-white leading-none tracking-tight mb-4 select-none">
              <span className="sr-only">{project.title.replace("_", " ")}</span>
              <span className="relative z-10">{project.title.replace("_", " ")}</span>
            </h1>
          </div>

          <p className="font-sans text-base sm:text-lg md:text-xl text-dirty-white/90 max-w-4xl leading-relaxed mt-4">
            {description}
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap items-center gap-4 mt-8">
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-acid-green text-void-black font-mono font-bold text-xs md:text-sm px-5 py-3 tracking-widest border-2 border-acid-green hover:bg-void-black hover:text-acid-green shadow-[4px_4px_0_var(--color-electric-blue)] transition-all cursor-cell"
              >
                <ExternalLink size={16} />
                <span>[ {t.liveDemo} ]</span>
              </a>
            )}

            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-void-black text-dirty-white font-mono font-bold text-xs md:text-sm px-5 py-3 tracking-widest border-2 border-dirty-white hover:bg-dirty-white hover:text-void-black shadow-[4px_4px_0_var(--color-hot-pink)] transition-all cursor-cell"
              >
                <Github size={16} />
                <span>[ {t.githubRepo} ]</span>
              </a>
            )}
          </div>
        </section>

        {/* MEDIA & SHOWCASE GALLERY */}
        <section className="mb-16 relative">
          <div className="flex items-center justify-between mb-4 border-b border-dirty-white/10 pb-2">
            <div className="flex items-center gap-2">
              <Film size={18} className="text-acid-green" />
              <h2 className="font-mono text-sm md:text-base font-bold text-acid-green tracking-wider">
                {"// "}{t.mediaGallery}
              </h2>
            </div>
            <span className="font-mono text-[10px] text-dirty-white/40">
              FRAME {selectedMediaIndex + 1} / {defaultMediaList.length}
            </span>
          </div>

          <div className="relative border-2 border-dirty-white bg-void-black p-2 md:p-4 shadow-[8px_8px_0_var(--color-electric-blue)]">
            <Tape className="-top-3 left-10 scale-75" />
            <Tape className="-bottom-3 right-10 scale-75 bg-hot-pink/60" />

            {/* MAIN MEDIA DISPLAY */}
            <div className="relative w-full aspect-video bg-black overflow-hidden flex items-center justify-center group">
              {activeMedia.type === "video" ? (
                <video
                  src={activeMedia.url}
                  poster={activeMedia.poster}
                  controls
                  className="w-full h-full object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div
                  className="relative w-full h-full cursor-pointer flex items-center justify-center overflow-hidden"
                  onClick={() => setIsZoomOpen(true)}
                >
                  <Image
                    src={activeMedia.url}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1280px) 100vw, 1200px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-void-black/20 group-hover:bg-transparent transition-colors pointer-events-none" />
                  <div className="absolute bottom-4 right-4 bg-void-black/90 border border-dirty-white/40 text-dirty-white px-2.5 py-1 text-[10px] font-mono flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 size={12} />
                    <span>{t.zoomImage}</span>
                  </div>
                </div>
              )}
            </div>

            {/* CAPTION */}
            <div className="mt-3 px-2 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-dirty-white/70">
              <p className="flex items-center gap-2">
                <span className="text-hot-pink">❯</span>
                <span>
                  {language === "en"
                    ? activeMedia.caption_en || `${project.title} Media Stream`
                    : activeMedia.caption_id || `Aliran Media ${project.title}`}
                </span>
              </p>
              <span className="text-[10px] text-dirty-white/40">
                TYPE: {activeMedia.type.toUpperCase()}
              </span>
            </div>

            {/* THUMBNAIL SELECTOR */}
            {defaultMediaList.length > 1 && (
              <div className="flex items-center gap-3 mt-4 pt-3 border-t border-dirty-white/10 overflow-x-auto pb-2">
                {defaultMediaList.map((media, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedMediaIndex(idx)}
                    className={`relative shrink-0 w-24 h-16 border-2 transition-all overflow-hidden cursor-pointer ${selectedMediaIndex === idx
                      ? "border-acid-green shadow-[0_0_10px_var(--color-acid-green)] scale-105"
                      : "border-dirty-white/20 opacity-60 hover:opacity-100"
                      }`}
                  >
                    <Image
                      src={media.poster || media.url}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                    {media.type === "video" && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={14} className="text-acid-green" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* TWO-COLUMN DETAILS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* LEFT: SPECS & ARCHITECTURE */}
          <div className="lg:col-span-1 space-y-6">
            {/* SPECS BOX */}
            <div className="bg-void-black border-2 border-dirty-white/30 p-6 shadow-[5px_5px_0_rgba(255,255,255,0.05)]">
              <div className="flex items-center gap-2 mb-4 border-b border-dirty-white/10 pb-2">
                <Cpu size={16} className="text-electric-blue" />
                <h3 className="font-mono text-xs font-bold tracking-widest text-electric-blue uppercase">
                  {"// "}{t.sysSpecs}
                </h3>
              </div>

              <dl className="space-y-3 font-mono text-xs">
                <div className="flex justify-between border-b border-dirty-white/5 pb-2">
                  <dt className="text-dirty-white/40">{t.categoryLabel}:</dt>
                  <dd className="text-hot-pink font-bold">{project.category}</dd>
                </div>
                <div className="flex justify-between border-b border-dirty-white/5 pb-2">
                  <dt className="text-dirty-white/40">{t.yearLabel}:</dt>
                  <dd className="text-dirty-white font-bold">{project.year}</dd>
                </div>
                <div className="flex justify-between border-b border-dirty-white/5 pb-2">
                  <dt className="text-dirty-white/40">STATUS:</dt>
                  <dd className="text-acid-green font-bold">{t.statusBadge}</dd>
                </div>
                <div className="flex justify-between border-b border-dirty-white/5 pb-2">
                  <dt className="text-dirty-white/40">SYSTEM ID:</dt>
                  <dd className="text-electric-blue font-bold">#{project.number}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-dirty-white/40">ACCESS:</dt>
                  <dd className="text-dirty-white font-bold">PUBLIC / OPEN</dd>
                </div>
              </dl>
            </div>

            {/* TECH STACK CHIPS */}
            <div className="bg-void-black border-2 border-dirty-white/30 p-6">
              <div className="flex items-center gap-2 mb-4 border-b border-dirty-white/10 pb-2">
                <Layers size={16} className="text-hot-pink" />
                <h3 className="font-mono text-xs font-bold tracking-widest text-hot-pink uppercase">
                  {"// "}{t.techStack}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="border border-dirty-white/30 bg-white/5 px-2.5 py-1 text-xs font-mono text-dirty-white hover:border-acid-green hover:text-acid-green transition-colors cursor-crosshair"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: ARCHITECTURE & KEY FEATURES */}
          <div className="lg:col-span-2 space-y-6">
            {/* ARCHITECTURE CARD */}
            {architecture && (
              <div className="bg-void-black border-2 border-dirty-white p-6 md:p-8 relative shadow-[6px_6px_0_var(--color-acid-green)]">
                <Tape className="-top-3 left-6 scale-75" />
                <div className="flex items-center gap-2 mb-4 border-b border-dirty-white/10 pb-2">
                  <Terminal size={18} className="text-acid-green" />
                  <h3 className="font-mono text-sm md:text-base font-bold text-acid-green tracking-widest uppercase">
                    {"// "}{t.archOverview}
                  </h3>
                </div>
                <p className="font-sans text-sm md:text-base text-dirty-white/90 leading-relaxed">
                  {architecture}
                </p>
              </div>
            )}

            {/* KEY FEATURES */}
            {keyFeatures && keyFeatures.length > 0 && (
              <div className="bg-void-black border-2 border-dirty-white/30 p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6 border-b border-dirty-white/10 pb-2">
                  <CheckCircle2 size={18} className="text-electric-blue" />
                  <h3 className="font-mono text-sm md:text-base font-bold text-electric-blue tracking-widest uppercase">
                    {"// "}{t.keyFeatures}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {keyFeatures.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm md:text-base text-dirty-white/90 font-sans"
                    >
                      <span className="text-acid-green font-mono font-bold mt-0.5">❯</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* HIGHLIGHTS */}
            {highlights && highlights.length > 0 && (
              <div className="bg-void-black border-2 border-hot-pink/40 p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4 border-b border-hot-pink/20 pb-2">
                  <ShieldCheck size={18} className="text-hot-pink" />
                  <h3 className="font-mono text-sm md:text-base font-bold text-hot-pink tracking-widest uppercase">
                    {"// "}{t.highlights}
                  </h3>
                </div>
                <ul className="space-y-2 font-mono text-xs md:text-sm text-dirty-white/80">
                  {highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-hot-pink font-bold">[*]</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM NAVIGATION / PREV & NEXT */}
        <nav
          aria-label="Project Navigation"
          className="border-t-2 border-dirty-white/20 pt-8 mt-12 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {prevProject && (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="p-4 border border-dirty-white/20 hover:border-acid-green bg-void-black/80 flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-3">
                <ArrowLeft
                  size={18}
                  className="text-dirty-white/50 group-hover:text-acid-green group-hover:-translate-x-1 transition-all"
                />
                <div>
                  <span className="font-mono text-[10px] text-dirty-white/40 block">
                    [ {t.prevProject} ]
                  </span>
                  <span className="font-black text-sm md:text-base uppercase group-hover:text-acid-green transition-colors">
                    {prevProject.title.replace("_", " ")}
                  </span>
                </div>
              </div>
              <span className="font-mono text-xs text-hot-pink font-bold">
                #{prevProject.number}
              </span>
            </Link>
          )}

          {nextProject && (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="p-4 border border-dirty-white/20 hover:border-electric-blue bg-void-black/80 flex items-center justify-between group transition-all md:text-right"
            >
              <span className="font-mono text-xs text-hot-pink font-bold order-2 md:order-1">
                #{nextProject.number}
              </span>
              <div className="flex items-center gap-3 order-1 md:order-2 justify-end w-full">
                <div>
                  <span className="font-mono text-[10px] text-dirty-white/40 block">
                    [ {t.nextProject} ]
                  </span>
                  <span className="font-black text-sm md:text-base uppercase group-hover:text-electric-blue transition-colors">
                    {nextProject.title.replace("_", " ")}
                  </span>
                </div>
                <ArrowRight
                  size={18}
                  className="text-dirty-white/50 group-hover:text-electric-blue group-hover:translate-x-1 transition-all"
                />
              </div>
            </Link>
          )}
        </nav>
      </main>

      {/* FULLSCREEN IMAGE MODAL */}
      <Modal
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
        showCloseButton={true}
        containerClassName="w-[95%] max-w-5xl bg-void-black border-4 border-dirty-white p-2 shadow-[15px_15px_0_var(--color-hot-pink)]"
      >
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          <Image
            src={activeMedia.url}
            alt={project.title}
            fill
            sizes="(max-width: 1280px) 95vw, 1200px"
            className="object-contain"
          />
        </div>
        <div className="p-3 font-mono text-xs text-dirty-white/80 flex justify-between items-center">
          <span>{project.title} — {activeMedia.caption_en || activeMedia.caption_id}</span>
          <span className="text-acid-green font-bold">[ ESC to close ]</span>
        </div>
      </Modal>

      <Footer />
    </div>
  );
}
