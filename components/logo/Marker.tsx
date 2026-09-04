import Link from "next/link";

const MarkerTitle = ({ firstTitle, secondTitle }: { firstTitle: string; secondTitle: string }) => {
    return (
        <Link
            href="/"
            className="group relative flex items-center gap-2 hover:scale-105 hover:cursor-cell transition-transform duration-300 cursor-pointer"
        >
            <span className="font-marker text-2xl md:text-4xl text-(--acid-green) drop-shadow-[2px_2px_0px_var(--void-black)] group-hover:text-(--electric-blue) transition-colors">
                {firstTitle}
            </span>

            <span className="font-marker md:text-2xl text-(--void-black) bg-(--hot-pink) px-2 py-1 -rotate-3 group-hover:rotate-2 transition-transform duration-200 shadow-[4px_4px_0px_var(--dirty-white)]">
                {secondTitle}
            </span>
        </Link>
    );
}

export default MarkerTitle;