"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import projects from "@/app/projects/projects";
import { motion, AnimatePresence } from "motion/react";
import Tape from "@/app/components/ui/Tape";
import Button from "@/app/components/ui/Button";
import Modal from "@/app/components/ui/Modal";
import { useLanguage } from "@/app/context/LanguageContext";
import {
  Terminal,
  Grid,
  List,
  Search,
  Github,
  Activity,
  Filter,
  Volume2,
  VolumeX,
  Clock,
  X,
  Calendar,
  Globe,
} from "lucide-react";

interface Project {
  id: number;
  number: string;
  title: string;
  category: string;
  year: string;
  theme: string;
  text: string;
  rotateClass: string;
  hasPattern?: boolean;
  description_id: string;
  description_en: string;
  tech: string[];
  links: { demo: string; github: string };
}

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
    totalFound: "ARCHIVES LOADED",
    inspectBtn: "INSPECT_SPEC",
    demoBtn: "EXECUTE_LIVE",
    githubBtn: "DECRYPT_SOURCE",
    drawerTitle: "SPECIFICATIONS_LOGGER",
    uuidLabel: "SYSTEM_UUID",
    yearLabel: "BUILD_YEAR",
    statusLabel: "STATUS",
    operational: "OPERATIONAL",
    languagesToggle: "TOGGLE_LANG",
    techStackHeader: "COMPILER_STACK_SPECS",
    cliBoot1: "BOOT SEQUENCE INITIATED... STATUS: OK",
    cliBoot2: "ESTABLISHING ENCRYPTED DATALINK WITH ARCHIVES VAULT...",
    cliBoot3: "3 EXPERIMENT NODES INDEXED AND READY FOR FETCHING",
    cliBoot4: "ENTER 'help' TO VIEW COMMAND INVENTORY PROTOCOLS",
  },
  id: {
    title: "DATABASES_PROYEK",
    subtitle:
      "Kumpulan lengkap layanan full-stack, visual noise, dan arsitektur client/server.",
    terminalTitle: "SISTEM_TERMINAL_INTI v1.0.0",
    filtersTitle: "PARAMETER_FILTER",
    searchPlaceholder: "CMD_SEARCH> Masukkan query pencarian...",
    viewGrid: "TAMPILAN_GRID",
    viewList: "DAFTAR_INVENTARIS",
    allTechs: "SEMUA_TEKNOLOGI",
    resetFilters: "RESET_FILTER_SISTEM",
    totalFound: "ARSIP DIMUAT",
    inspectBtn: "INSPEKSI_SPEK",
    demoBtn: "JALANKAN_DEMO",
    githubBtn: "DEKRIPSI_KODE",
    drawerTitle: "LOG_SPESIFIKASI",
    uuidLabel: "UUID_SISTEM",
    yearLabel: "TAHUN_RILIS",
    statusLabel: "STATUS",
    operational: "BERJALAN",
    languagesToggle: "UBAH_BAHASA",
    techStackHeader: "SPESIFIKASI_KOMPILER_STACK",
    cliBoot1: "SEKUEN BOOT DIJALANKAN... STATUS: OK",
    cliBoot2: "MEMBANGUN KONEKSI ENKRIPSI DENGAN KUBAH ARSIP...",
    cliBoot3: "3 ARSIP EKSPERIMEN TERINDEKS DAN SIAP DIRETRIEVE",
    cliBoot4: "KETIK 'help' UNTUK MELIHAT DAFTAR PROTOKOL KOMANDO",
  },
};

export default function ProjectsPageClient() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { language, setLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  const [cliInput, setCliInput] = useState<string>("");
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const t = UI_TEXT[language];

  useEffect(() => {
    setTerminalHistory([t.cliBoot1, t.cliBoot2, t.cliBoot3, t.cliBoot4]);
  }, [language, t.cliBoot1, t.cliBoot2, t.cliBoot3, t.cliBoot4]);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalHistory]);

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => { });
        audioContextRef.current = null;
      }
    };
  }, []);

  const playSynthSound = (type: "click" | "success" | "beep" | "error") => {
    if (!soundEnabled || typeof window === "undefined") {
      return;
    }
    try {
      const windowContext = window as unknown as CustomWindow;
      const AudioContextClass =
        windowContext.AudioContext || windowContext.webkitAudioContext;
      if (!AudioContextClass) {
        return;
      }
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContextClass();
      }
      const audioContext = audioContextRef.current;
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      if (type === "click") {
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.04, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.001,
          audioContext.currentTime + 0.05,
        );
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.05);
      } else if (type === "beep") {
        oscillator.type = "square";
        oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.001,
          audioContext.currentTime + 0.12,
        );
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.12);
      } else if (type === "success") {
        oscillator.type = "triangle";
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(
          1300,
          audioContext.currentTime + 0.18,
        );
        gainNode.gain.setValueAtTime(0.04, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.001,
          audioContext.currentTime + 0.22,
        );
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.22);
      } else if (type === "error") {
        oscillator.type = "sawtooth";
        oscillator.frequency.setValueAtTime(160, audioContext.currentTime);
        oscillator.frequency.linearRampToValueAtTime(
          90,
          audioContext.currentTime + 0.35,
        );
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.001,
          audioContext.currentTime + 0.35,
        );
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.35);
      }
    } catch (error) {
      void error;
    }
  };

  const handleCommand = (rawCommand: string) => {
    const trimmed = rawCommand.trim();
    if (!trimmed) {
      return;
    }

    setTerminalHistory((prev) => [...prev, `GUEST@CHAOS_PORTO:~$ ${trimmed}`]);
    const lowerCommand = trimmed.toLowerCase();
    const parts = lowerCommand.split(" ");
    const primaryCommand = parts[0];
    const argument = parts.slice(1).join(" ");

    if (primaryCommand === "help") {
      playSynthSound("success");
      setTerminalHistory((prev) => [
        ...prev,
        "AVAILABLE SYSTEM COMMANDS:",
        "  help              - DISPLAY COMMAND INVENTORY DIRECTORY",
        "  list              - RETRIEVE ALL INDEXED VAULT MODULES",
        "  info [id/number]  - DUMP DECRYPTED SPEC LOGS OF A VAULT MODULE",
        "  open [id/number]  - LOAD INTERACTIVE GRAPHICAL USER INTERFACE",
        "  view [grid|list]  - OVERRIDE MAIN GRAPHICAL INTERFACE REPRESENTATION",
        "  clear             - WIPE CURRENT VOLATILE TERMINAL LOG BUFFER",
      ]);
    } else if (primaryCommand === "list") {
      playSynthSound("success");
      const listLines = projects.map(
        (project) =>
          `  [ID: ${project.id}] ${project.title} (${project.year}) - CATEGORY: ${project.category}`,
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
          `INTERFACE OVERRIDE SUCCESSFUL: ${argument.toUpperCase()}`,
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
          p.title.toLowerCase() === argument,
      );
      if (match) {
        playSynthSound("success");
        if (primaryCommand === "open") {
          setSelectedProject(match);
          setTerminalHistory((prev) => [
            ...prev,
            `EXECUTING INTERACTIVE GRAPHICAL UI LOADER FOR: ${match.title}...`,
          ]);
        } else {
          setTerminalHistory((prev) => [
            ...prev,
            `DECRYPTED ARCHIVE DATA SPECS [${match.title}]:`,
            `  HEX_KEY: 0x00F${match.id}EC7B`,
            `  CATEGORY: ${match.category}`,
            `  COMPILER_YEAR: ${match.year}`,
            `  TECH_COMPONENTS: ${match.tech.join(", ")}`,
            `  DEMO_HOST: ${match.links.demo || "NOT_HOSTED"}`,
            `  REPOSITORY: ${match.links.github || "ENCRYPTED"}`,
            `  OPERATIONAL_STATUS: SECURED`,
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
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(cliInput);
            }}
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
                // SEARCH
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
                // COMPILER_SEGMENT
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
                // TECH_COMPONENTS
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
                // TIMELINE_RECORD
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
                  {t.totalFound}:
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
                      className="border-2 border-dirty-white/10 hover:border-dirty-white relative bg-void-black/80 aspect-square p-6 flex flex-col justify-between overflow-hidden group cursor-pointer shadow-[3px_3px_0_rgba(255,255,255,0.02)]"
                      onClick={() => {
                        playSynthSound("click");
                        setSelectedProject(project);
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
                        <span className="font-mono text-[9px] bg-dirty-white/10 text-dirty-white/60 px-2 py-0.5 border border-dirty-white/10">
                          ID_SYS: #0{project.id}
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

                      <div className="relative z-10 border-t border-dirty-white/10 pt-4 flex flex-wrap gap-1.5">
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
                          // ID
                        </th>
                        <th className="p-4 font-bold tracking-widest text-[10px]">
                          // FILE_NAME
                        </th>
                        <th className="p-4 font-bold tracking-widest text-[10px]">
                          // COMPILER
                        </th>
                        <th className="p-4 font-bold tracking-widest text-[10px]">
                          // YEAR
                        </th>
                        <th className="p-4 font-bold tracking-widest text-[10px]">
                          // COMPONENTS_STACK
                        </th>
                        <th className="p-4 font-bold tracking-widest text-[10px]">
                          // STATUS
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProjects.map((project) => (
                        <tr
                          key={project.id}
                          onClick={() => {
                            playSynthSound("click");
                            setSelectedProject(project);
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

      <Modal
        isOpen={selectedProject !== null}
        onClose={() => {
          playSynthSound("click");
          setSelectedProject(null);
        }}
        showCloseButton={false}
        noiseOpacity="opacity-15"
        containerClassName="relative w-full max-w-4xl bg-void-black border-2 border-dirty-white shadow-[10px_10px_0px_var(--color-acid-green)] overflow-hidden flex flex-col md:flex-row max-h-[90vh] !p-0"
      >
        {selectedProject && (
          <>
            <div className="absolute top-6 right-20 z-50">
              <Button
                variant="retro"
                onClick={() => {
                  playSynthSound("success");
                  setLanguage((prev) => (prev === "en" ? "id" : "en"));
                }}
                className="text-[9px] px-2.5 py-1.5 bg-void-black/50 backdrop-blur-sm"
              >
                [ {t.languagesToggle}: {language.toUpperCase()} ]
              </Button>
            </div>

            <Tape className="-top-4 right-10 rotate-3" />

            <div
              className={`w-full md:w-1/3 ${selectedProject.theme} p-8 flex flex-col justify-between relative overflow-hidden`}
            >
              <div className="noise-overlay absolute! opacity-20 mix-blend-multiply"></div>

              <span className="font-glitch text-8xl text-void-black opacity-30 absolute -top-4 -left-4 select-none">
                {selectedProject.number}
              </span>

              <div className="relative z-10 mt-10">
                <h3 className="font-black text-3xl uppercase text-void-black leading-none mb-3 tracking-tighter">
                  {selectedProject.title.split("_")[0]}
                  <br />
                  {selectedProject.title.split("_")[1] || ""}
                </h3>
                <div className="inline-flex items-center gap-1.5 font-mono text-[10px] bg-void-black text-dirty-white px-2 py-1">
                  <Clock size={10} className="text-acid-green" />
                  <span>
                    {t.yearLabel}: {selectedProject.year}
                  </span>
                </div>
              </div>

              <div className="relative z-10 mt-auto pt-8 border-t border-void-black/10">
                <div className="w-8 h-1 bg-void-black mb-3"></div>
                <p className="font-mono text-[10px] text-void-black font-bold tracking-widest uppercase">
                  TYPE: {selectedProject.category}
                </p>
              </div>
            </div>

            <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col bg-void-black text-dirty-white relative overflow-y-auto max-h-[70vh] md:max-h-none">
              <h4 className="text-lg font-bold text-acid-green mb-4 flex items-center gap-2 font-mono tracking-wider">
                <Activity
                  size={16}
                  className="text-acid-green animate-pulse"
                />
                <span>_ {t.drawerTitle}</span>
              </h4>

              <div className="grid grid-cols-2 gap-4 mb-6 border border-dirty-white/10 p-3 bg-black/40 font-mono text-[10px]">
                <div>
                  <span className="text-dirty-white/40 block mb-0.5">
                    // {t.uuidLabel}
                  </span>
                  <span className="text-electric-blue font-bold">
                    0x00F{selectedProject.id}82BA
                  </span>
                </div>
                <div>
                  <span className="text-dirty-white/40 block mb-0.5">
                    // {t.statusLabel}
                  </span>
                  <span className="text-acid-green font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-acid-green rounded-full animate-ping"></span>
                    {t.operational.toUpperCase()}
                  </span>
                </div>
              </div>

              <p className="font-sans text-base md:text-lg leading-relaxed mb-8 text-dirty-white/80">
                {language === "en"
                  ? selectedProject.description_en
                  : selectedProject.description_id}
              </p>

              <div className="mb-8">
                <h4 className="text-xs font-bold text-hot-pink mb-3 font-mono tracking-wider">
                  {`// ${t.techStackHeader}`}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="border border-dirty-white/20 bg-white/5 px-2.5 py-1 text-xs font-mono text-dirty-white/70 hover:bg-dirty-white hover:text-void-black hover:border-dirty-white transition-all cursor-crosshair"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto grid grid-cols-2 gap-4 pt-4 border-t border-dirty-white/10">
                <Button
                  disabled={!selectedProject.links.demo}
                  onClick={() => {
                    playSynthSound("success");
                    if (selectedProject.links.demo) {
                      window.open(selectedProject.links.demo);
                    }
                  }}
                  variant="glitch"
                  className="py-3 text-xs tracking-widest flex items-center justify-center gap-2"
                >
                  <Globe size={14} />
                  {t.demoBtn}
                </Button>
                <Button
                  disabled={!selectedProject.links.github}
                  onClick={() => {
                    playSynthSound("success");
                    if (selectedProject.links.github) {
                      window.open(selectedProject.links.github);
                    }
                  }}
                  variant="brutalist"
                  className="py-3 text-xs flex items-center justify-center gap-2"
                >
                  <Github size={14} />
                  {t.githubBtn}
                </Button>
              </div>

              <button
                onClick={() => {
                  playSynthSound("click");
                  setSelectedProject(null);
                }}
                className="absolute top-4 right-4 text-dirty-white/60 hover:text-hot-pink transition-colors p-2 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
          </>
        )}
      </Modal>

      <Footer />
    </div>
  );
}
