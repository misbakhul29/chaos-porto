"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const SOCIAL_LINKS = [
    { name: "GITHUB", href: "https://github.com/misbakhul29", icon: Github, hoverColor: "hover:text-acid-green" },
    { name: "LINKEDIN", href: "https://www.linkedin.com/in/misbakhul2904", icon: Linkedin, hoverColor: "hover:text-electric-blue" },
    { name: "EMAIL", href: "mailto:misbakhul2904@gmail.com", icon: Mail, hoverColor: "hover:text-hot-pink" },
  ];

  const NAV_LINKS = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "#about" },
    { name: "PROJECTS", href: "#projects" },
    { name: "CONTACT", href: "#contact" },
  ];

  return (
    <footer className="bg-void-black border-t-8 border-dirty-white pt-16 pb-8 relative overflow-hidden">
      
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="font-glitch text-5xl md:text-7xl text-dirty-white mb-4 leading-[0.8]">
                CHAOS<br/>
                <span className="text-acid-green">PORTO_</span>
              </h2>
              <p className="font-mono text-dirty-white/60 max-w-sm">
                {`// Decoding complexity into digital experiences. 
                Built with raw code and heavy caffeine.`}
              </p>
            </div>
            
            <div className="mt-8 flex items-center gap-2 font-mono text-xs text-electric-blue border border-electric-blue/30 w-fit px-3 py-1">
              <span className="w-2 h-2 bg-electric-blue rounded-full animate-pulse"></span>
              SYSTEM STATUS: ONLINE
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-marker text-xl text-hot-pink mb-6 rotate-1">NAVIGATION</h3>
            <ul className="space-y-2 font-bold font-(--font-space-grotesk)">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="group flex items-center gap-2 text-dirty-white hover:text-acid-green hover:cursor-cell transition-colors"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity font-mono text-xs">
                      {">"}
                    </span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <h3 className="font-marker text-xl text-hazard-orange mb-6 -rotate-1">CONNECT</h3>
              <div className="flex flex-wrap gap-4">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      border-2 border-dirty-white p-3 text-dirty-white transition-all duration-300
                      hover:-translate-y-1 hover:shadow-[4px_4px_0px_var(--color-dirty-white)] hover:cursor-cell
                      ${social.hoverColor}
                    `}
                    aria-label={social.name}
                  >
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
            </div>

            <button 
              onClick={scrollToTop}
              className="mt-8 group flex items-center gap-2 text-left w-fit hover:cursor-cell"
            >
              <div className="w-12 h-12 border-2 border-dirty-white flex items-center justify-center bg-white/5 group-hover:bg-acid-green group-hover:border-acid-green group-hover:text-void-black transition-all duration-300">
                <ArrowUp size={24} />
              </div>
              <span className="font-mono text-xs text-dirty-white group-hover:text-acid-green transition-colors">
                RETURN_TO_TOP
              </span>
            </button>
          </div>
        </div>

        <div className="border-t-2 border-dirty-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs text-dirty-white/50">
          <p>
            © {new Date().getFullYear()} MISBAKHUL MUNIR. ALL RIGHTS RESERVED.
          </p>
          <p className="flex items-center gap-1">
            MADE_WITH <span className="text-hot-pink">♥</span> AND <span className="text-electric-blue">NEXT.JS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}