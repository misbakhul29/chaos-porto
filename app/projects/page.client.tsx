"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "motion/react";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/lib/context/LanguageContext";
import {
  Terminal,
  Grid,
  List,
  Search,
  Filter,
  Volume2,
  VolumeX,
  Calendar,
} from "lucide-react";
import projects from "./projects";

interface CustomWindow extends Window {
  AudioContext?: typeof AudioContext;
  webkitAudioContext?: typeof AudioContext;
}

const UI_TEXT = {
  en: {
    title: "PROJECTS_DATABASE",
    subtitle:
      "Complete repository of full-stack services, visual noise, and client/server architectures.",
    terminalTitle: "CORE_TERMINAL_SYSTEM v1.0.0",
    filtersTitle: "FILTER_PARAMETERS",
    searchPlaceholder: "CMD_SEARCH> Enter search query...",
    viewGrid: "GRID_VIEW",
    viewList: "INVENTORY_LIST",
    allTechs: "ALL_TECHNOLOGIES",
    resetFilters: "RESET_SYSTEM_FILTERS",
    totalResults: "MATCHING_MODULES",
    filterByCategory: "SEGMENT",
    filterByYear: "TIMELINE",
    filterByTech: "COMPONENTS",
    cliBoot1: "AUTHENTICATING ENCRYPTED DATA CONNECTION...",
    cliBoot2: "INDEXING SYSTEM ASSETS [OK] (7 MODULES DETECTED)",
    cliBoot3: "TYPE 'help' FOR COMMAND DIRECTORY OR 'list' TO VIEW ALL.",
    cliBoot4: "----------------------------------------------------",
    operational: "OPERATIONAL",
    languagesToggle: "LOCALE",
    soundOn: "SFX_ON",
    soundOff: "SFX_MUTED",
    statusLabel: "SYSTEM_STATUS",
    uuidLabel: "HEX_IDENTIFIER",
    yearLabel: "YEAR",
  },
  id: {
    title: "DATABASE_PROYEK",
    subtitle:
      "Repositori lengkap layanan full-stack, visual noise, dan arsitektur client/server.",
    terminalTitle: "SISTEM_TERMINAL_UTAMA v1.0.0",
    filtersTitle: "PARAMETER_FILTER",
    searchPlaceholder: "CMD_CARI> Masukkan kata kunci...",
    viewGrid: "TAMPILAN_GRID",
    viewList: "DAFTAR_INVENTARIS",
    allTechs: "SEMUA_TEKNOLOGI",
    resetFilters: "RESET_FILTER_SISTEM",
    totalResults: "MODUL_DITEMUKAN",
    filterByCategory: "SEGMEN",
    filterByYear: "LINIMASA",
    filterByTech: "KOMPONEN",
    cliBoot1: "MENGAUTENTIKASI KONEKSI DATA TERENKRIPSI...",
    cliBoot2: "MENGINDEKS ASET SISTEM [OK] (7 MODUL TERDETEKSI)",
    cliBoot3: "KETIK 'help' UNTUK DIREKTORI PERINTAH ATAU 'list' UNTUK MELIHAT SEMUA.",
    cliBoot4: "----------------------------------------------------",
    operational: "OPERASIONAL",
    languagesToggle: "BAHASA",
    soundOn: "SFX_AKTIF",
    soundOff: "SFX_SENYAP",
    statusLabel: "STATUS_SISTEM",
    uuidLabel: "IDENTIFIKASI_HEX",
    yearLabel: "TAHUN",
  },
};

export default function ProjectsPageClient() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  const [cliInput, setCliInput] = useState<string>("");
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
  const [prevLanguage, setPrevLanguage] = useState<string | null>(null);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const t = UI_TEXT[language];

  if (prevLanguage !== language) {
    setPrevLanguage(language);
    setTerminalHistory([t.cliBoot1, t.cliBoot2, t.cliBoot3, t.cliBoot4]);
  }

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalHistory]);

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => { });
      }
    };
  }, []);

  const playSynthSound = (type: "click" | "success" | "beep" | "error") => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const windowContext = window as unknown as CustomWindow;
      const AudioContextClass = windowContext.AudioContext || windowContext.webkitAudioContext;
      if (!AudioContextClass) return;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContextClass();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === "click") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === "success") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(880, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === "error") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.setValueAtTime(100, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === "beep") {
        osc.type = "square";
        osc.frequency.setValueAtTime(1200, now);
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.03);
        osc.start(now);
        osc.stop(now + 0.03);
      }
    } catch {
    }
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = cliInput.trim();
    if (!trimmed) return;

    const [cmd, ...args] = trimmed.split(" ");
    const primaryCommand = cmd.toLowerCase();
    const argument = args.join(" ").toLowerCase();

    setTerminalHistory((prev) => [...prev, `GUEST@CHAOS_PORTO:~$ ${trimmed}`]);

    if (primaryCommand === "help") {
      playSynthSound("click");
      setTerminalHistory((prev) => [
        ...prev,
        "AVAILABLE SYSTEM COMMANDS:",
        "  help              - DISPLAY COMMAND INVENTORY DIRECTORY",
        "  list              - RETRIEVE ALL INDEXED VAULT MODULES",
        "  info [id/number]  - DUMP DECRYPTED SPEC LOGS OF A VAULT MODULE",
        "  open [id/number]  - OPEN DEDICATED VAULT SPEC PAGE FOR A MODULE",
        "  view [grid|list]  - OVERRIDE MAIN GRAPHICAL INTERFACE REPRESENTATION",
        "  clear             - WIPE CURRENT VOLATILE TERMINAL LOG BUFFER",
      ]);
    } else if (primaryCommand === "list") {
      playSynthSound("success");
      const listLines = projects.map(
        (project) =>
          `  [ID: ${project.id}] ${project.title} (${project.year}) - CATEGORY: ${project.category} -> /projects/${project.slug}`,
      );
      setTerminalHistory((prev) => [
        ...prev,
        "QUERYING DATA SYSTEM REGISTRY...",
        ...listLines,
      ]);
    } else if (primaryCommand === "clear") {
      playSynthSound("click");
      setTerminalHistory([]);
    } else if (primaryCommand === "view") {
      if (argument === "grid" || argument === "list") {
        playSynthSound("success");
        setViewMode(argument as "grid" | "list");
        setTerminalHistory((prev) => [
          ...prev,
          `VIEW MATRIX SWITCHED TO: ${argument.toUpperCase()}`,
        ]);
      } else {
        playSynthSound("error");
        setTerminalHistory((prev) => [
          ...prev,
          "ERROR: PARAMETER ILLEGAL. USE 'view grid' OR 'view list'.",
        ]);
      }
    } else if (primaryCommand === "info" || primaryCommand === "open") {
      const match = projects.find(
        (p) =>
          p.id === parseInt(argument) ||
          p.number === argument ||
          p.slug === argument ||
          p.title.toLowerCase() === argument,
      );
      if (match) {
        playSynthSound("success");
        if (primaryCommand === "open") {
          setTerminalHistory((prev) => [
            ...prev,
            `NAVIGATING TO DEDICATED VAULT MODULE: ${match.title} (/projects/${match.slug})...`,
          ]);
          router.push(`/projects/${match.slug}`);
        } else {
          setTerminalHistory((prev) => [
            ...prev,
            `DECRYPTED ARCHIVE DATA SPECS [${match.title}]:`,
            `  HEX_KEY: 0x00F${match.id}EC7B`,
            `  SLUG: ${match.slug}`,
            `  CATEGORY: ${match.category}`,
            `  COMPILER_YEAR: ${match.year}`,
            `  TECH_COMPONENTS: ${match.tech.join(", ")}`,
            `  DEMO_HOST: ${match.links.demo || "NOT_HOSTED"}`,
            `  REPOSITORY: ${match.links.github || "ENCRYPTED"}`,
            `  OPERATIONAL_STATUS: SECURED`,
            `  COMMAND: run 'open ${match.id}' to launch detail page.`,
          ]);
        }
      } else {
        playSynthSound("error");
        setTerminalHistory((prev) => [
          ...prev,
          `ERROR: ARCHIVE VAULT ID OR TITLE '${argument}' UNRESOLVABLE.`,
        ]);
      }
    } else {
      playSynthSound("error");
      setTerminalHistory((prev) => [
        ...prev,
        `SYSTEM FAULT: ORDER '${trimmed}' UNKNOWN. INPUT 'help' TO QUERY DIRECTORY.`,
      ]);
    }
    setCliInput("");
  };

  const allTechStacks = Array.from(
    new Set(projects.flatMap((project) => project.tech)),
  );

  const allCategories = Array.from(
    new Set(projects.map((project) => project.category)),
  );

  const allYears = Array.from(new Set(projects.map((project) => project.year)));

  const filteredProjects = projects.filter((project) => {
    const cleanQuery = searchQuery.trim().toLowerCase();
    const queryWithSpaces = cleanQuery.replace(/[_-]/g, " ");
    const titleWithSpaces = project.title.toLowerCase().replace(/[_-]/g, " ");
    const categoryWithSpaces = project.category
      .toLowerCase()
      .replace(/[_-]/g, " ");
    const matchesSearch =
      !cleanQuery ||
      titleWithSpaces.includes(queryWithSpaces) ||
      project.title.toLowerCase().includes(cleanQuery) ||
      categoryWithSpaces.includes(cleanQuery) ||
      project.description_en.toLowerCase().includes(cleanQuery) ||
      project.description_id.toLowerCase().includes(cleanQuery) ||
      project.tech.some((techItem) => {
        const cleanTech = techItem.toLowerCase();
        return (
          cleanTech.includes(cleanQuery) ||
          cleanTech.replace(/[_-]/g, " ").includes(queryWithSpaces)
        );
      });

    const matchesTech =
      selectedTechs.length === 0 ||
      selectedTechs.every((t) => project.tech.includes(t));

    const matchesCategory =
      !selectedCategory || project.category === selectedCategory;

    const matchesYear = !selectedYear || project.year === selectedYear;

    return matchesSearch && matchesTech && matchesCategory && matchesYear;
  }).sort((a, b) => {
    // Sort by year descending
    const yearA = parseInt(a.year) || 0;
    const yearB = parseInt(b.year) || 0;
    if (yearB !== yearA) {
      return yearB - yearA;
    }
    // If year is the same, sort by ID descending (or number descending)
    return b.id - a.id;
  });

  const toggleTechFilter = (tech: string) => {
    playSynthSound("click");
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech],
    );
  };

  const handleCategorySelect = (category: string) => {
    playSynthSound("click");
    setSelectedCategory((prev) => (prev === category ? "" : category));
  };

  const handleYearSelect = (year: string) => {
    playSynthSound("click");
    setSelectedYear((prev) => (prev === year ? "" : year));
  };

  const resetAllFilters = () => {
    playSynthSound("success");
    setSearchQuery("");
    setSelectedTechs([]);
    setSelectedCategory("");
    setSelectedYear("");
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden">
      <div className="noise-overlay absolute! opacity-5"></div>

      <Header />

      <main className="grow container mx-auto max-w-7xl px-4 md:px-6 pt-28 pb-20 relative z-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="font-glitch text-4xl md:text-7xl mb-4 text-dirty-white relative inline-block">
              <span className="relative z-10">{t.title}</span>
              <span className="absolute top-1.5 left-1.5 text-hot-pink z-5 opacity-60 blur-sm select-none">
                {t.title}
              </span>
            </h1>
            <p className="font-mono text-sm md:text-base text-dirty-white/60 max-w-xl">
              {t.subtitle}
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => {
                playSynthSound("click");
                setLanguage((prev) => (prev === "en" ? "id" : "en"));
              }}
              className="px-4 py-2 border-dirty-white/20 bg-white/5 hover:border-acid-green hover:text-acid-green font-mono text-xs"
            >
              [ {language.toUpperCase()} ]
            </Button>
            <Button
              variant="outline"
              onClick={() => setSoundEnabled((prev) => !prev)}
              className="px-4 py-2 border-dirty-white/20 bg-white/5 hover:border-hot-pink hover:text-hot-pink font-mono text-xs flex items-center gap-2"
            >
              {soundEnabled ? (
                <>
                  <Volume2 size={14} /> [ SOUND_ON ]
                </>
              ) : (
                <>
                  <VolumeX size={14} className="text-hot-pink" /> [ MUTED ]
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="mb-12 border-2 border-dirty-white/10 bg-void-black/70 backdrop-blur-md p-4 relative shadow-[5px_5px_0_rgba(255,255,255,0.05)]">
          <div className="absolute top-0 right-4 -translate-y-1/2 bg-void-black border border-dirty-white/20 px-2 py-0.5 text-[10px] font-mono text-dirty-white/40 tracking-wider">
            {t.terminalTitle}
          </div>
          <div className="h-44 overflow-y-auto mb-4 font-mono text-xs text-acid-green/90 p-2 bg-black/60 rounded flex flex-col gap-1 border border-dirty-white/5">
            {terminalHistory.map((line, index) => (
              <div key={index} className="leading-relaxed whitespace-pre-wrap">
                {line}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>
          <form
            onSubmit={handleCommandSubmit}
            className="flex items-center gap-2 bg-black/80 border border-dirty-white/10 p-2"
          >
            <Terminal size={14} className="text-acid-green animate-pulse" />
            <span className="font-mono text-xs text-acid-green/60">
              GUEST@CHAOS_PORTO:~$
            </span>
            <input
              type="text"
              value={cliInput}
              onChange={(e) => setCliInput(e.target.value)}
              placeholder="Type 'help' for instructions..."
              className="grow bg-transparent border-none outline-none font-mono text-xs text-acid-green placeholder-acid-green/30"
              maxLength={80}
            />
            <Button
              type="submit"
              variant="retro"
              className="bg-acid-green text-void-black border-none px-3 py-1 text-[10px] font-bold hover:bg-hot-pink hover:text-dirty-white"
            >
              EXECUTE
            </Button>
          </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-1 border-2 border-dirty-white/10 bg-void-black/50 p-6 flex flex-col gap-6 relative shadow-[4px_4px_0_rgba(255,255,255,0.02)]">
            <div className="flex items-center gap-2 border-b border-dirty-white/10 pb-3">
              <Filter size={16} className="text-hot-pink" />
              <h2 className="font-mono text-sm font-bold tracking-widest text-hot-pink">
                {t.filtersTitle}
              </h2>
            </div>

            <div>
              <h3 className="font-mono text-xs font-bold text-dirty-white/60 mb-2.5">
                {"// SEARCH"}
              </h3>
              <div className="relative flex items-center bg-black/50 border border-dirty-white/20 p-2">
                <Search size={14} className="text-dirty-white/30 mr-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                  placeholder="Query parameters..."
                  className="w-full bg-transparent border-none outline-none font-mono text-xs text-dirty-white placeholder-dirty-white/20"
                />
              </div>
            </div>

            <div>
              <h3 className="font-mono text-xs font-bold text-dirty-white/60 mb-2.5">
                {"// COMPILER_SEGMENT"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`font-mono text-[10px] border px-2.5 py-1 transition-all cursor-pointer ${selectedCategory === cat
                      ? "bg-hot-pink text-void-black border-hot-pink font-bold shadow-[2px_2px_0_var(--color-electric-blue)]"
                      : "border-dirty-white/20 hover:border-dirty-white/60 text-dirty-white/80"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-mono text-xs font-bold text-dirty-white/60 mb-2.5">
                {"// TECH_COMPONENTS"}
              </h3>
              <div className="flex flex-wrap gap-1.5 max-h-44 overflow-y-auto pr-1">
                {allTechStacks.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => toggleTechFilter(tech)}
                    className={`font-mono text-[9px] border px-2 py-0.5 transition-all cursor-pointer ${selectedTechs.includes(tech)
                      ? "bg-acid-green text-void-black border-acid-green font-bold shadow-[2px_2px_0_var(--color-hot-pink)]"
                      : "border-dirty-white/10 hover:border-dirty-white/30 text-dirty-white/60"
                      }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-mono text-xs font-bold text-dirty-white/60 mb-2.5">
                {"// TIMELINE_RECORD"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {allYears.map((year) => (
                  <button
                    key={year}
                    onClick={() => handleYearSelect(year)}
                    className={`font-mono text-[10px] border px-2.5 py-1 transition-all cursor-pointer ${selectedYear === year
                      ? "bg-electric-blue text-void-black border-electric-blue font-bold shadow-[2px_2px_0_var(--color-hot-pink)]"
                      : "border-dirty-white/20 hover:border-dirty-white/60 text-dirty-white/80"
                      }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            {(searchQuery ||
              selectedTechs.length > 0 ||
              selectedCategory ||
              selectedYear) && (
                <button
                  onClick={resetAllFilters}
                  className="mt-4 border-2 border-dashed border-hot-pink text-hot-pink hover:bg-hot-pink hover:text-void-black transition-all py-2 text-xs font-mono font-bold tracking-widest cursor-pointer w-full text-center"
                >
                  {t.resetFilters}
                </button>
              )}
          </div>

          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-dirty-white/10 pb-4 gap-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-dirty-white/40">
                  {t.totalResults}:
                </span>
                <span className="bg-dirty-white/10 border border-dirty-white/20 font-mono text-xs px-2 py-0.5 text-acid-green font-bold">
                  {filteredProjects.length.toString().padStart(2, "0")} /{" "}
                  {projects.length.toString().padStart(2, "0")}
                </span>
              </div>

              <div className="flex border border-dirty-white/20 rounded overflow-hidden">
                <button
                  onClick={() => {
                    playSynthSound("click");
                    setViewMode("grid");
                  }}
                  className={`px-3 py-2 cursor-pointer transition-colors flex items-center gap-2 font-mono text-[10px] ${viewMode === "grid"
                    ? "bg-dirty-white text-void-black font-bold"
                    : "bg-transparent text-dirty-white/60 hover:text-dirty-white"
                    }`}
                >
                  <Grid size={12} />
                  {t.viewGrid}
                </button>
                <button
                  onClick={() => {
                    playSynthSound("click");
                    setViewMode("list");
                  }}
                  className={`px-3 py-2 cursor-pointer transition-colors flex items-center gap-2 font-mono text-[10px] ${viewMode === "list"
                    ? "bg-dirty-white text-void-black font-bold"
                    : "bg-transparent text-dirty-white/60 hover:text-dirty-white"
                    }`}
                >
                  <List size={12} />
                  {t.viewList}
                </button>
              </div>
            </div>

            <AnimatePresence mode="popLayout">
              {viewMode === "grid" ? (
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="border-2 border-dirty-white/10 hover:border-acid-green relative bg-void-black/80 aspect-square p-6 flex flex-col justify-between overflow-hidden group cursor-pointer shadow-[3px_3px_0_rgba(255,255,255,0.02)] hover:shadow-[6px_6px_0_var(--color-acid-green)]"
                      onClick={() => {
                        playSynthSound("click");
                        router.push(`/projects/${project.slug}`);
                      }}
                    >
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-tr from-hot-pink/5 via-transparent to-electric-blue/5"></div>

                      {project.hasPattern && (
                        <svg
                          className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
                          viewBox="0 0 100 100"
                        >
                          <pattern
                            id={`vault-grid-${project.id}`}
                            width="10"
                            height="10"
                            patternUnits="userSpaceOnUse"
                          >
                            <path
                              d="M 10 0 L 0 0 0 10"
                              fill="none"
                              stroke="white"
                              strokeWidth="0.5"
                            />
                          </pattern>
                          <rect
                            width="100"
                            height="100"
                            fill={`url(#vault-grid-${project.id})`}
                          />
                        </svg>
                      )}

                      <span className="font-glitch text-8xl text-dirty-white/5 group-hover:text-dirty-white/10 transition-colors duration-500 absolute -top-4 -right-4 select-none">
                        {project.number}
                      </span>

                      <div className="relative z-10 flex justify-between items-start">
                        <span className="font-mono text-[9px] bg-dirty-white/10 text-dirty-white/60 px-2 py-0.5 border border-dirty-white/10 group-hover:border-acid-green/40 group-hover:text-acid-green transition-colors">
                          ID_SYS: #{project.number}
                        </span>
                        <span className="font-mono text-[9px] text-hot-pink">
                          {project.category}
                        </span>
                      </div>

                      <div className="relative z-10 mt-6">
                        <h3 className="font-black text-2xl tracking-tighter uppercase group-hover:text-acid-green transition-colors leading-none mb-1">
                          {project.title.replace("_", " ")}
                        </h3>
                        <div className="flex items-center gap-1.5 font-mono text-[10px] text-dirty-white/40">
                          <Calendar size={10} />
                          <span>YEAR: {project.year}</span>
                        </div>
                      </div>

                      <div className="relative z-10 border-t border-dirty-white/10 pt-4 flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {project.tech.slice(0, 3).map((item) => (
                            <span
                              key={item}
                              className="bg-black/40 border border-dirty-white/20 text-dirty-white/60 px-1.5 py-0.5 text-[8px] font-mono"
                            >
                              {item}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span className="text-[8px] font-mono text-dirty-white/30 self-center">
                              +{project.tech.length - 3}
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-[9px] text-acid-green opacity-0 group-hover:opacity-100 transition-opacity">
                          [ OPEN ❯ ]
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full overflow-x-auto border border-dirty-white/10"
                >
                  <table className="w-full text-left font-mono text-xs border-collapse">
                    <thead>
                      <tr className="bg-dirty-white/5 border-b border-dirty-white/10 text-dirty-white/40">
                        <th className="p-4 font-bold tracking-widest text-[10px]">
                          {"// ID"}
                        </th>
                        <th className="p-4 font-bold tracking-widest text-[10px]">
                          {"// FILE_NAME"}
                        </th>
                        <th className="p-4 font-bold tracking-widest text-[10px]">
                          {"// COMPILER"}
                        </th>
                        <th className="p-4 font-bold tracking-widest text-[10px]">
                          {"// YEAR"}
                        </th>
                        <th className="p-4 font-bold tracking-widest text-[10px]">
                          {"// COMPONENTS_STACK"}
                        </th>
                        <th className="p-4 font-bold tracking-widest text-[10px]">
                          {"// STATUS"}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProjects.map((project) => (
                        <tr
                          key={project.id}
                          onClick={() => {
                            playSynthSound("click");
                            router.push(`/projects/${project.slug}`);
                          }}
                          className="border-b border-dirty-white/5 hover:bg-white/5 cursor-pointer transition-colors group"
                        >
                          <td className="p-4 text-hot-pink font-bold">
                            #0{project.id}
                          </td>
                          <td className="p-4 font-bold text-dirty-white group-hover:text-acid-green transition-colors">
                            {project.title}
                          </td>
                          <td className="p-4 text-electric-blue">
                            {project.category}
                          </td>
                          <td className="p-4 text-dirty-white/60">
                            {project.year}
                          </td>
                          <td className="p-4 text-dirty-white/40 flex items-center gap-1.5 flex-wrap">
                            {project.tech.map((item) => (
                              <span
                                key={item}
                                className="bg-black/30 border border-dirty-white/15 px-1 py-0.5 text-[9px] text-dirty-white/60"
                              >
                                {item}
                              </span>
                            ))}
                          </td>
                          <td className="p-4">
                            <span className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-acid-green rounded-full animate-pulse shadow-[0_0_5px_var(--color-acid-green)]"></span>
                              <span className="text-[9px] text-acid-green font-bold">
                                {t.operational}
                              </span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
