import { Link } from "lucide-react";

const BrutalistStack = ({ firstTitle, secondTitle }: { firstTitle: string, secondTitle: string }) => {
    return (
        <Link
            href="/"
            className="group relative cursor-pointer"
        >
            <div className="absolute inset-0 bg-(--acid-green) translate-x-1 translate-y-1 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform opacity-0 group-hover:opacity-100 mix-blend-difference"></div>

            <div className="flex items-baseline gap-1 font-black tracking-tighter">
                <span className="font-sans text-4xl text-transparent bg-clip-text bg-linear-to-r from-(--acid-green) to-(--electric-blue) group-hover:from-(--hot-pink) group-hover:to-(--hazard-orange) transition-all duration-500">
                    {firstTitle}
                </span>
                <span className="font-glitch text-4xl text-(--dirty-white) group-hover:-skew-x-12 transition-transform duration-300">
                    {secondTitle}
                </span>
            </div>

            <div className="h-1 w-0 group-hover:w-full bg-(--hot-pink) transition-all duration-300 ease-out"></div>
        </Link>
    );
}

export default BrutalistStack;