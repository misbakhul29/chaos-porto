import Link from "next/link";

const CyberTerminal = ({ firstTitle, secondTitle }: { firstTitle: string, secondTitle: string }) => {
    return (
        <Link
            href="/"
            className="group flex flex-col items-start leading-none cursor-pointer"
        >
            <span className="font-mono text-xs text-(--dirty-white)/60 -mb-1.25 tracking-widest group-hover:text-(--acid-green) transition-colors">
                &lt;PORTFOLIO /&gt;
            </span>
            <div className="font-glitch text-4xl text-(--dirty-white) group-hover:text-(--acid-green) transition-colors duration-300 [text-shadow:2px_2px_0px_var(--hot-pink)]">
                {firstTitle}
                <span className="text-(--electric-blue)">{secondTitle}</span>
                <span className="animate-pulse text-(--hazard-orange)">_</span>
            </div>
        </Link>
    );
}

export default CyberTerminal;