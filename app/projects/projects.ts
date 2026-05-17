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

const projects: Project[] = [
  {
    id: 1,
    number: "01",
    title: "VIRTUAL_DRESS",
    category: "#VDRESS",
    year: "2025",
    theme: "bg-electric-blue",
    text: "text-void-black",
    rotateClass: "",
    description_id: "Sebuah eksperimen gacha virtual dressing room. Menggabungkan PWA untuk performa mobile-native dan animasi frame-by-frame untuk pengalaman unboxing item yang dramatis.",
    description_en: "A virtual dressing room gacha experiment. Combining PWA for mobile-native performance and frame-by-frame animation for a dramatic item unboxing experience.",
    tech: ["Next.js", "PWA", "Framer Motion", "Tailwind"],
    links: { demo: "https://vdress.vercel.app/", github: "https://github.com/misbakhul29/vdress" }
  },
  {
    id: 2,
    number: "02",
    title: "GOLANG_SMTP",
    category: "#SMTP_API",
    year: "2026",
    theme: "bg-hot-pink",
    text: "text-void-black",
    rotateClass: "md:mt-12 md:rotate-3",
    description_id: "Layanan REST API pengirim email yang sangat cepat dan ringan berbasis Go. Dilengkapi dengan middleware keamanan, sanitasi injeksi header, in-memory rate limiting, dan autentikasi API Key.",
    description_en: "Blazing fast and lightweight email sender REST API service built with Go. Equipped with security middleware, header injection sanitization, in-memory rate limiting, and API Key authentication.",
    tech: ["Golang", "SMTP", "Nginx", "PM2"],
    links: { demo: "https://smtp.misbakhul.my.id/", github: "https://github.com/misbakhul29/goalng-smtp-server" }
  },
  {
    id: 3,
    number: "03",
    title: "SCRAPER_BOT",
    category: "#SCRAPER",
    year: "2025",
    theme: "bg-acid-green",
    text: "text-void-black",
    rotateClass: "md:-mt-8 md:-rotate-2",
    hasPattern: true,
    description_id: "Engine web scraping otomatis yang berjalan di VPS. Menggunakan browser headless dengan teknik anti-bot detection canggih untuk mengumpulkan data pasar secara real-time.",
    description_en: "Automated web scraping engine running on VPS. Uses headless browsers with advanced anti-bot detection techniques to collect market data in real-time.",
    tech: ["Golang", "Rabbitmq", "PM2", "Playwright"],
    links: { demo: "", github: "https://github.com/misbakhul29/scraper-golang" }
  },
  {
    id: 4,
    number: "04",
    title: "GOLANG_API",
    category: "#GO_API",
    year: "2026",
    theme: "bg-hazard-orange",
    text: "text-void-black",
    rotateClass: "md:mt-6 md:rotate-1",
    hasPattern: true,
    description_id: "RESTful API modern, aman, dan berkinerja tinggi berbasis Go & Huma v2. Dilengkapi Clean Architecture, caching Redis (Lazy Loading & Active Invalidation), dan rate limiting IP client.",
    description_en: "Modern, secure, and high-performance RESTful API built with Go & Huma v2. Featuring Clean Architecture, Redis caching (Lazy Loading & Active Invalidation), and client IP rate limiting.",
    tech: ["Golang", "Huma v2", "Redis", "PostgreSQL", "GORM", "Docker"],
    links: { demo: "https://api.go.misbakhul.my.id/docs", github: "https://github.com/misbakhul29/learn-golang-api" }
  }
];

export default projects;