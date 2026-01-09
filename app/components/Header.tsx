"use client"; 
import { useState, useEffect } from "react";
import Link from "next/link";
import MarkerTitle from "./logo/Marker";
import { Menu, X } from "lucide-react";
import { data as metadata } from "@/lib/metadata";

export default function Header() {
    const firstTitle = metadata.title ? metadata.title.toString().split(" ")[0] : "Chaos"; 
    const secondTitle = metadata.title ? metadata.title.toString().split(" ")[1] : "Porto";

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    const navItems = [
        {
            name: "Home",
            href: "#home",
            className: "hover:text-acid-green -rotate-3 hover:rotate-3",
            mobileColor: "text-acid-green"
        },
        {
            name: "About",
            href: "#about",
            className: "hover:text-hot-pink rotate-3 hover:-rotate-3",
            mobileColor: "text-hot-pink"
        },
        {
            name: "Projects",
            href: "#projects",
            className: "hover:text-electric-blue -rotate-3 hover:rotate-3",
            mobileColor: "text-electric-blue"
        },
        {
            name: "Contact",
            href: "#contact",
            className: "hover:text-hazard-orange rotate-3 hover:-rotate-3",
            mobileColor: "text-hazard-orange"
        },
    ];

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        setIsOpen(false);
        
        if (href.startsWith("#")) {
            e.preventDefault();
            const targetId = href.replace("#", "");
            const elem = document.getElementById(targetId);
            if (elem) {
                const headerOffset = 100;
                const elementPosition = elem.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        }
    };

    return (
        <>
            <header className="sticky top-0 left-0 w-full h-20 flex items-center justify-center z-[9999] mix-blend-difference text-dirty-white">
                <div className="container mx-auto max-w-7xl flex items-center justify-between px-6">
                    
                    <MarkerTitle firstTitle={firstTitle} secondTitle={secondTitle} />

                    <nav className="hidden md:flex gap-8 items-center justify-end font-marker text-xl">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={(e) => handleLinkClick(e, item.href)}
                                className={`${item.className} transition-transform duration-200 hover:cursor-cell`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden relative group p-2"
                        aria-label="Toggle Menu"
                    >
                        <div className="relative z-10 text-black transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                            <div className="absolute -z-10 -inset-1 bg-(--acid-green) rotate-18"></div>
                        </div>
                    </button>
                </div>
            </header>

            <div 
                className={`
                    fixed inset-0 z-9998 bg-void-black flex flex-col items-center justify-center
                    transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]
                    ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}
                `}
            >
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                
                <div className="absolute top-24 left-1/2 -translate-x-1/2 w-40 h-8 bg-white/10 -rotate-2 backdrop-blur-sm border border-white/20"></div>

                <nav className="flex flex-col gap-8 text-center relative z-10">
                    {navItems.map((item, idx) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={(e) => handleLinkClick(e, item.href)}
                            className={`
                                group relative font-glitch text-5xl md:text-6xl text-dirty-white uppercase tracking-widest
                                transition-all duration-300 hover:scale-110
                                ${idx % 2 === 0 ? "rotate-2 hover:-rotate-2" : "-rotate-2 hover:rotate-2"}
                            `}
                        >
                            <span className={`absolute -inset-1 ${item.mobileColor} opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-200`}></span>
                            <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-dirty-white group-hover:to-dirty-white/50 transition-colors">
                                {item.name}
                            </span>
                            
                            <span className={`absolute left-0 top-1/2 w-0 h-2 ${item.mobileColor.replace('text-', 'bg-')} -translate-y-1/2 transition-all duration-300 group-hover:w-full opacity-70 mix-blend-exclusion -rotate-1`}></span>
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-10 font-mono text-xs text-dirty-white/30 text-center">
                    [ SYSTEM_NAV_V1.0 ]<br/>
                    TAP LINK TO NAVIGATE
                </div>
            </div>
        </>
    );
}