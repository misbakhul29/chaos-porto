'use client';

export default function HeroSection() {
    const handleDownloadResume = () => {
        window.open("/Resume.pdf", "_blank");
    }
    return (
        <section id="#" className="min-h-[calc(100dvh-4rem)] flex flex-col justify-center items-center text-center px-4 relative overflow-hidden bg-(--void-black)">
            <h1 className="font-glitch text-8xl md:text-[13rem] leading-[0.85] mb-8 hero-text select-none z-70 text-(--dirty-white)">
                FULL<br />
                <span className="text-(--acid-green) relative inline-block transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                    STACK
                    <svg className="absolute w-[110%] h-[50%] -bottom-4 -left-2 pointer-events-none" style={{ zIndex: -1 }}>
                        <path d="M0 20 Q 50 40 100 20 T 200 30" stroke="var(--neon-purple)" strokeWidth="8" fill="none" strokeLinecap="round" />
                    </svg>
                </span>
            </h1>

            <p className="font-marker text-2xl md:text-4xl max-w-3xl transform rotate-2 z-70">
                <span className="stabilo-highlight">Architecting the Void.</span> 
                <span className="stabilo-highlight stabilo-pink">Rendering the Vision.</span>
            </p>

            <div className="mt-16 transform -rotate-2 z-70">
                <button onClick={() => handleDownloadResume() } className="glitch-btn px-10 py-4 text-2xl font-bold font-mono tracking-tighter cursor-cell">
                    Execute()
                </button>
            </div>
        </section>
    );
}