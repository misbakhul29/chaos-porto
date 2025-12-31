import { metadata } from "../layout";
import Link from "next/link";
import MarkerTitle from "./logo/Marker";

export default function Header() {
    const firstTitle = metadata.title?.toString().split(" ")[0] || "Chaos";
    const secondTitle = metadata.title?.toString().split(" ")[1] || "Porto";

    const navItems = [
        {
            name: "Home",
            href: "/",
            className: "hover:text-[var(--acid-green)] -rotate-3 hover:rotate-3",
        },
        {
            name: "About",
            href: "#about",
            className: "hover:text-[var(--hot-pink)] rotate-3 hover:-rotate-3",
        },
        {
            name: "Projects",
            href: "#projects",
            className: "hover:text-[var(--electric-blue)] -rotate-3 hover:rotate-3",
        },
        {
            name: "Contact",
            href: "#contact",
            className: "hover:text-[var(--hazard-orange)] rotate-3 hover:-rotate-3",
        },
    ];

    return (
        <div className="sticky top-0 left-0 w-full h-20 flex items-center justify-center z-9999 mix-blend-difference text-(--dirty-white)">
            <div className="container mx-auto max-w-7xl flex items-center justify-between px-4">
                <MarkerTitle firstTitle={firstTitle} secondTitle={secondTitle} />

                <div className="flex gap-8 items-center justify-end font-marker text-xl">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`${item.className} transition-transform duration-200`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}