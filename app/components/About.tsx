"use client";

import { useState, useEffect } from "react";
import Marquee from "./Marquee";

const FLOW_DATA = [
    {
        id: "design",
        label: "Design",
        colorClass: "text-dirty-white",
        themeColor: "text-dirty-white",
        borderColor: "border-dirty-white",
        title: "CHAOS DESIGN",
        desc_id: "Memecah kesunyian dengan visual yang berani. Figma adalah kanvas, brutalism adalah kuasnya. Fokus pada UX yang tidak hanya fungsional, tapi juga meninggalkan kesan.",
        desc_en: "Breaking silence with bold visuals. Figma is the canvas, brutalism is the brush. Focusing on UX that is not just functional, but leaves a permanent mark.",
        tags: ["Figma", "Wireframe", "Prototyping", "UI/UX"],
    },
    {
        id: "develop",
        label: "Develop",
        colorClass: "text-electric-blue",
        themeColor: "text-electric-blue",
        borderColor: "border-electric-blue",
        title: "SYSTEM CORE",
        desc_id: "Menerjemahkan desain menjadi logika yang type-safe. Membangun arsitektur component yang scalable menggunakan Next.js, React Server Components, dan pattern modern.",
        desc_en: "Translating design into type-safe logic. Building scalable component architectures using Next.js, React Server Components, and modern patterns.",
        tags: ["Next.js", "React", "TypeScript", "Postgres"],
    },
    {
        id: "dockerize",
        label: "Dockerize",
        colorClass: "text-acid-green",
        themeColor: "text-acid-green",
        borderColor: "border-acid-green",
        title: "CONTAINERIZE",
        desc_id: "Menghilangkan alasan 'it works on my machine'. Membungkus aplikasi dalam environment yang terisolasi, konsisten, dan siap tempur sebelum masuk production.",
        desc_en: "Eliminating 'it works on my machine'. Wrapping applications in isolated, consistent, and battle-ready environments before production.",
        tags: ["Docker", "Compose", "CI/CD", "Linux"],
    },
    {
        id: "deploy",
        label: "Deploy",
        isStroke: true,
        colorClass: "text-transparent",
        themeColor: "text-hazard-orange",
        borderColor: "border-hazard-orange",
        title: "LAUNCH SEQ",
        desc_id: "Melepaskan kode ke production. Mengelola VPS, konfigurasi Nginx/Reverse Proxy, memastikan keamanan, dan monitoring uptime maksimal.",
        desc_en: "Releasing code to production. Managing VPS, Nginx/Reverse Proxy configurations, ensuring security, and monitoring for maximum uptime.",
        tags: ["VPS", "Vercel", "Nginx", "Monitoring"],
    },
];

const BIO_TEXT = {
    en: {
        role: "Full Stack Developer",
        p1_start: "I am a",
        p1_end: "forging order from chaos. Focused on",
        p1_focus: "End-to-End",
        p1_end2: "domination—from raw",
        p1_db: "Postgres",
        p1_end3: "schemas to pixel-perfect",
        p1_fe: "Next.js",
        p1_end4: "interfaces.",
        p2_start: "My code is",
        p2_highlight: "Type-Safe",
        p2_end: "clean, and battle-tested in",
        p2_tool: "Docker",
        p2_end2: "before it ever sees the light.",
        quote: "\"Validation is my religion.\""
    },
    id: {
        role: "Full Stack Developer",
        p1_start: "Saya adalah",
        p1_end: "menciptakan tatanan dari kekacauan. Fokus pada dominasi",
        p1_focus: "End-to-End",
        p1_end2: "—dari skema",
        p1_db: "Postgres",
        p1_end3: "mentah hingga antarmuka",
        p1_fe: "Next.js",
        p1_end4: "yang pixel-perfect.",
        p2_start: "Kode saya",
        p2_highlight: "Type-Safe",
        p2_end: "bersih, dan teruji tempur di dalam",
        p2_tool: "Docker",
        p2_end2: "sebelum melihat cahaya.",
        quote: "\"Validasi adalah agama saya.\""
    }
};

export default function About() {
    const [activeModal, setActiveModal] = useState<typeof FLOW_DATA[0] | null>(null);
    const [language, setLanguage] = useState<"en" | "id">("en");

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setActiveModal(null);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    const t = BIO_TEXT[language];

    return (
        <div id="about" className="flex flex-col gap-20 h-fit md:min-h-screen justify-center py-20 md:py-0 overflow-hidden">
            <Marquee />

            <section className="max-w-7xl w-full mx-auto px-6 relative mt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                    
                    <div className="relative group">
                        <div className="absolute -top-6 -left-6 md:-top-10 md:-left-10 w-full h-full border-4 border-hot-pink z-0 transform -rotate-3 transition-transform duration-300 group-hover:rotate-0"></div>

                        <div className="bg-void-black border-4 border-dirty-white p-6 md:p-8 relative z-10 transform rotate-2 transition-transform duration-300 group-hover:rotate-0">
                            <div className="tape"></div>

                            <div className="absolute top-3 right-3 md:top-4 md:right-4 z-50">
                                <button
                                    onClick={() => setLanguage(prev => prev === "en" ? "id" : "en")}
                                    className="font-mono text-[10px] md:text-xs font-bold text-dirty-white hover:text-acid-green transition-colors border border-dirty-white/30 px-2 py-1 bg-void-black cursor-pointer"
                                >
                                    [ <span className={language === "en" ? "text-acid-green" : "text-dirty-white/50"}>EN</span> / <span className={language === "id" ? "text-acid-green" : "text-dirty-white/50"}>ID</span> ]
                                </button>
                            </div>

                            <h2 className="font-glitch text-4xl md:text-6xl mb-6 text-acid-green leading-[0.9]">
                                THE<br />ARCHITECT
                            </h2>

                            <p className="text-xs md:text-lg leading-relaxed mb-6 font-bold text-dirty-white">
                                {t.p1_start} <span className="stabilo-highlight stabilo-blue text-void-black px-0.5">{t.role}</span> {t.p1_end} <span className="text-electric-blue">{t.p1_focus}</span> {t.p1_end2} <strong>{t.p1_db}</strong> {t.p1_end3} <strong>{t.p1_fe}</strong> {t.p1_end4}
                            </p>

                            <p className="text-xs md:text-base leading-relaxed mb-6 font-bold text-dirty-white/80">
                                {t.p2_start} <span className="underline decoration-wavy decoration-hazard-orange">{t.p2_highlight}</span>, {t.p2_end} <strong>{t.p2_tool}</strong> {t.p2_end2}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-4 font-mono text-xs md:text-sm">
                                {['TypeScript', 'Next.js', 'Tailwind', 'Node', 'Go'].map((tech) => (
                                    <span key={tech} className="bg-white/10 px-2 py-1 border border-dirty-white/30 hover:bg-acid-green hover:text-void-black transition-colors cursor-crosshair">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <p className="mt-8 text-base md:text-lg font-marker text-hot-pink rotate-1">
                                {t.quote}
                            </p>
                        </div>
                    </div>

                    <div id="flow" className="text-right flex flex-col justify-center h-full items-end gap-2 z-70 mb-8 md:mb-0">
                        <div className="transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                            {FLOW_DATA.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => setActiveModal(item)}
                                    className="group relative cursor-pointer w-fit ml-auto py-1 hover:cursor-cell"
                                >
                                    <div className={`absolute -right-8 top-1/2 w-0 h-1 ${item.id === 'deploy' ? 'bg-hazard-orange' : 'bg-dirty-white'} transition-all duration-200 group-hover:w-6`}></div>

                                    <h3
                                        className={`
                                            text-4xl sm:text-5xl md:text-7xl font-bold leading-tight uppercase transition-all duration-200
                                            font-(--font-space-grotesk)
                                            ${item.colorClass}
                                            ${item.isStroke
                                                ? '[-webkit-text-stroke:1px_var(--color-hazard-orange)] md:[-webkit-text-stroke:2px_var(--color-hazard-orange)] hover:[-webkit-text-stroke:0px] hover:text-hazard-orange'
                                                : 'hover:scale-105 hover:-translate-x-2'
                                            }
                                        `}
                                    >
                                        {item.label}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {activeModal && (
                    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
                        <div
                            className="absolute inset-0 bg-void-black/90 backdrop-blur-md cursor-pointer animate-in fade-in duration-300"
                            onClick={() => setActiveModal(null)}
                        >
                            <div className="noise-overlay opacity-20"></div>
                        </div>

                        <div className={`
                            relative w-[95%] md:w-full max-w-lg bg-void-black 
                            border-4 ${activeModal.borderColor} 
                            p-6 md:p-12 
                            transform rotate-1 shadow-[10px_10px_0px_rgba(0,0,0,0.5)] md:shadow-[15px_15px_0px_rgba(0,0,0,0.5)]
                            animate-in zoom-in-95 fade-in duration-200
                            max-h-[85vh] overflow-y-auto
                        `}>
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 md:w-32 h-6 md:h-8 bg-white/10 -rotate-2 backdrop-blur-sm border border-white/20"></div>

                            <div className="absolute top-4 right-4 text-[10px] font-mono opacity-50 tracking-widest text-dirty-white">
                                [ SYS_ID: {activeModal.id.toUpperCase()} ]
                            </div>

                            <h3 className={`font-glitch text-4xl md:text-6xl mb-6 ${activeModal.themeColor}`}>
                                {activeModal.title}
                            </h3>

                            <p className="font-mono text-sm md:text-lg leading-relaxed text-dirty-white mb-8 border-l-4 border-white/10 pl-4 py-2">
                                {language === "en" ? activeModal.desc_en : activeModal.desc_id}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {activeModal.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className={`text-[10px] md:text-xs font-bold uppercase px-2 py-1 border ${activeModal.borderColor} text-dirty-white bg-white/5`}
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            <button
                                onClick={() => setActiveModal(null)}
                                className={`
                                    w-full py-3 md:py-4 font-black uppercase text-lg md:text-xl tracking-[0.2em]
                                    border-2 ${activeModal.borderColor} text-dirty-white
                                    hover:bg-dirty-white hover:text-void-black transition-colors duration-200
                                    cursor-pointer
                                `}
                            >
                                [ CLOSE_PROCESS ]
                            </button>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}