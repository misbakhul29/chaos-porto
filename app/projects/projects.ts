export interface ProjectMedia {
  type: "image" | "video";
  url: string;
  caption_id?: string;
  caption_en?: string;
  poster?: string;
}

export interface Project {
  id: number;
  slug: string;
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
  media?: ProjectMedia[];
  architecture_id?: string;
  architecture_en?: string;
  keyFeatures_id?: string[];
  keyFeatures_en?: string[];
  highlights_id?: string[];
  highlights_en?: string[];
}

const projects: Project[] = [
  {
    id: 1,
    slug: "virtual-dress",
    number: "01",
    title: "VIRTUAL_DRESS",
    category: "#VDRESS",
    year: "2025",
    theme: "bg-electric-blue",
    text: "text-void-black",
    rotateClass: "",
    description_id: "Sebuah eksperimen gacha virtual dressing room. Menggabungkan PWA untuk performa mobile-native dan animasi frame-by-frame untuk pengalaman unboxing item yang dramatis.",
    description_en: "A virtual dressing room gacha experiment. Combining PWA for mobile-native performance and frame-by-frame animation for a dramatic item unboxing experience.",
    tech: ["Next.js", "PWA", "Framer Motion", "Tailwind CSS"],
    links: { demo: "https://vdress.vercel.app/", github: "https://github.com/misbakhul29/vdress" },
    architecture_id: "Client-side Next.js PWA dengan state management berbasis React context, prefetching aset animasi, serta render frame teroptimasi untuk perangkat mobile.",
    architecture_en: "Client-side Next.js PWA architecture featuring React context state management, animation asset prefetching, and hardware-accelerated frame rendering.",
    keyFeatures_id: [
      "Simulasi Gacha interaktif dengan probabilitas drop item",
      "PWA Offline-ready dengan Service Worker caching",
      "Animasi dynamic unboxing berbasis Framer Motion",
      "Kustomisasi tampilan pakaian karakter secara real-time"
    ],
    keyFeatures_en: [
      "Interactive Gacha simulation with calibrated drop odds",
      "Offline-ready PWA with Service Worker caching",
      "Dynamic Framer Motion unboxing sequences",
      "Real-time character outfit customization"
    ],
    highlights_id: [
      "Performa skor Lighthouse 98+ pada kategori PWA dan Performance",
      "Transisi layout 60 FPS tanpa frame drop"
    ],
    highlights_en: [
      "98+ Lighthouse scores across PWA and Performance metrics",
      "Consistent 60 FPS layout transitions"
    ],
    media: [
      {
        type: "image",
        url: "https://cdn.misbakhul.com/projects/vdress.png",
        caption_id: "Antarmuka Virtual Dressing Room & Gacha Showcase",
        caption_en: "Virtual Dressing Room & Gacha Showcase Interface"
      }
    ]
  },
  {
    id: 2,
    slug: "golang-smtp",
    number: "02",
    title: "GOLANG_SMTP",
    category: "#SMTP_API",
    year: "2026",
    theme: "bg-hot-pink",
    text: "text-void-black",
    rotateClass: "md:mt-12 md:rotate-3",
    description_id: "Layanan REST API pengirim email yang sangat cepat dan ringan berbasis Go. Dilengkapi dengan middleware keamanan, sanitasi injeksi header, in-memory rate limiting, dan autentikasi API Key.",
    description_en: "Blazing fast and lightweight email sender REST API service built with Go. Equipped with security middleware, header injection sanitization, in-memory rate limiting, and API Key authentication.",
    tech: ["Golang", "SMTP Protocol", "Nginx", "PM2", "REST API"],
    links: { demo: "https://smtp.misbakhul.my.id/", github: "https://github.com/misbakhul29/goalng-smtp-server" },
    architecture_id: "Microservice Go dengan Goroutine worker pool untuk asynchronous email dispatching, strict validation regex, dan zero external database footprint.",
    architecture_en: "Lightweight Go microservice utilizing Goroutine worker pools for asynchronous email dispatching, strict regex validation, and zero external DB overhead.",
    keyFeatures_id: [
      "Autentikasi Bearer API Key dengan hashing timing-safe",
      "Perlindungan otomatis dari serangan CRLF & Header Injection",
      "Sliding-window in-memory rate limiting",
      "Dukungan HTML template email dan multi-attachment"
    ],
    keyFeatures_en: [
      "Timing-safe Bearer API Key authentication",
      "Automated CRLF & header injection mitigation",
      "In-memory sliding-window rate limiting",
      "Rich HTML template formatting and multi-attachment delivery"
    ],
    highlights_id: [
      "Latency respon API < 15ms untuk queueing email",
      "Penggunaan memori runtime < 20MB di VPS"
    ],
    highlights_en: [
      "Sub-15ms API response latency for queueing dispatches",
      "Minimal runtime memory footprint (< 20MB on VPS)"
    ],
    media: [
      {
        type: "image",
        url: "/placholder.png",
        caption_id: "Dokumentasi & Live Endpoint GOLANG_SMTP",
        caption_en: "GOLANG_SMTP API Live Endpoint & Documentation"
      }
    ]
  },
  {
    id: 3,
    slug: "scraper-bot",
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
    tech: ["Golang", "RabbitMQ", "PM2", "Playwright", "Docker"],
    links: { demo: "", github: "https://github.com/misbakhul29/scraper-golang" },
    architecture_id: "Distributed scraping pipeline berbasis antrian pesan RabbitMQ dengan concurrency pool di Golang dan worker headless browser.",
    architecture_en: "Distributed scraping pipeline orchestrated via RabbitMQ message queues with concurrency worker pools in Golang and headless browser nodes.",
    keyFeatures_id: [
      "Bypass fingerprinting headless browser dan Cloudflare turnstile",
      "Distributed task queuing via RabbitMQ",
      "Sistem rotasi proxy & user-agent adaptif",
      "Data export otomatis ke PostgreSQL & JSON dataset"
    ],
    keyFeatures_en: [
      "Headless fingerprint stealth and anti-bot mitigation",
      "Distributed task queue processing via RabbitMQ",
      "Adaptive proxy & user-agent rotating system",
      "Automated batch persistence to PostgreSQL & structured JSON"
    ],
    highlights_id: [
      "Mampu mengekstraksi 50,000+ data/jam secara stabil",
      "Retry policy otomatis dengan exponential backoff"
    ],
    highlights_en: [
      "Processes 50,000+ records/hour reliably",
      "Automated exponential backoff error recovery"
    ],
    media: [
      {
        type: "image",
        url: "/placholder.png",
        caption_id: "Arsitektur Pipeline Ekstraksi Data Scraping",
        caption_en: "Data Scraping Extraction Pipeline Architecture"
      }
    ]
  },
  {
    id: 4,
    slug: "golang-api",
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
    links: { demo: "https://api.go.misbakhul.my.id/docs", github: "https://github.com/misbakhul29/learn-golang-api" },
    architecture_id: "Clean Architecture (Domain, UseCase, Repository, Handler) dengan auto-generated OpenAPI 3.1 schema via Huma v2 dan distributed caching di Redis.",
    architecture_en: "Clean Architecture layer separation (Domain, UseCase, Repository, Delivery) with auto-generated OpenAPI 3.1 docs via Huma v2 and distributed Redis caching.",
    keyFeatures_id: [
      "Dokumentasi OpenAPI 3.1 / Swagger interaktif otomatis",
      "Two-tier caching (in-memory + Redis cluster)",
      "Strict data validation dan structured error response RFC 7807",
      "Database migration & rollback otomatis dengan GORM"
    ],
    keyFeatures_en: [
      "Automatic interactive OpenAPI 3.1 / Swagger docs generation",
      "Two-tier caching strategy (in-memory + Redis cluster)",
      "Strict payload validation with RFC 7807 structured error responses",
      "Automated schema migrations and rollback pipelines"
    ],
    highlights_id: [
      "Throughput hingga 15,000 req/sec pada benchmark lokal",
      "Dokumentasi API lengkap dapat diuji langsung via browser"
    ],
    highlights_en: [
      "Achieved 15,000 req/sec benchmark throughput",
      "Fully interactive live API documentation console"
    ],
    media: [
      {
        type: "image",
        url: "/placholder.png",
        caption_id: "Huma v2 Interactive API Documentation Console",
        caption_en: "Huma v2 Interactive API Documentation Console"
      }
    ]
  },
  // {
  //   id: 5,
  //   slug: "auto-article",
  //   number: "05",
  //   title: "AUTO_ARTICLE",
  //   category: "#AUTOMATION",
  //   year: "2026",
  //   theme: "bg-electric-blue",
  //   text: "text-void-black",
  //   rotateClass: "md:mt-8 md:-rotate-2",
  //   hasPattern: true,
  //   description_id: "Sistem auto post artikel yang ditenagai Hugo dan cron job Golang. Menghasilkan artikel setiap 12 jam menggunakan model AI openai/gpt-oss-120b:free (peringkat #15 SEO) dan web scraper Golang untuk mengumpulkan gambar.",
  //   description_en: "Automated article posting system powered by Hugo and a Golang cron job. Generates articles every 12 hours using the openai/gpt-oss-120b:free AI model (ranked #15 SEO) and a Golang web scraper to collect images.",
  //   tech: ["Hugo", "Golang", "OpenAI AI", "Web Scraper", "Cron"],
  //   links: { demo: "https://article.misbakhul.com", github: "" },
  //   architecture_id: "Headless content engine yang mengotomatisasi prompt AI, parsing Markdown, pengunduhan & optimasi WebP gambar, lalu memicu build statis Hugo via Git commit webhook.",
  //   architecture_en: "Headless content engine automating AI prompt orchestration, Markdown parsing, image scraping with WebP compression, and Git-triggered Hugo static builds.",
  //   keyFeatures_id: [
  //     "Scheduled generation setiap 12 jam via autonomous cron daemon",
  //     "Integrasi model AI LLM berperingkat SEO tinggi",
  //     "Scraping gambar kontekstual dengan kompresi WebP otomatis",
  //     "Output Hugo SSG ultra-cepat dengan zero-runtime overhead"
  //   ],
  //   keyFeatures_en: [
  //     "Scheduled generation every 12 hours via autonomous cron daemon",
  //     "Integrated high-ranking SEO LLM prompt engineering",
  //     "Contextual image scraping with automatic WebP compression",
  //     "Ultra-fast Hugo SSG output with zero runtime overhead"
  //   ],
  //   highlights_id: [
  //     "Menerbitkan ratusan artikel teroptimasi SEO secara autopilot",
  //     "Skor Core Web Vitals 100/100 pada website artikel publik"
  //   ],
  //   highlights_en: [
  //     "Hundreds of SEO-optimized articles published on autopilot",
  //     "Perfect 100/100 Core Web Vitals on public article portal"
  //   ],
  //   media: [
  //     {
  //       type: "image",
  //       url: "/og-image.png",
  //       caption_id: "Auto Article Publishing Portal & Engine",
  //       caption_en: "Auto Article Publishing Portal & Engine"
  //     }
  //   ]
  // },
  {
    id: 6,
    slug: "chi-openapi",
    number: "06",
    title: "CHI_OPENAPI",
    category: "#GO_API",
    year: "2026",
    theme: "bg-neon-purple",
    text: "text-void-black",
    rotateClass: "md:mt-10 md:rotate-2",
    hasPattern: true,
    description_id: "Template backend Go siap produksi menggunakan Chi Router dan OpenAPI (oapi-codegen). Dilengkapi dynamic spec-driven security, rate limiting otomatis, session management terintegrasi database, dan audit logging.",
    description_en: "Production-ready Go backend template using Chi Router and OpenAPI (oapi-codegen). Features dynamic spec-driven security, automatic rate limiting, DB-backed session validation, and audit logging.",
    tech: ["Golang", "Chi Router", "OpenAPI", "GORM", "PostgreSQL", "JWT"],
    links: { demo: "", github: "https://github.com/misbakhul29/go-backend-chi-openapi" },
    architecture_id: "Spec-first API development di mana file OpenAPI YAML menjadi single source of truth untuk generate boilerplate server, request binding, dan security checks.",
    architecture_en: "Contract-first API development paradigm where OpenAPI YAML specifications generate strict server interfaces, validation bindings, and middleware security.",
    keyFeatures_id: [
      "Code generator otomatis via oapi-codegen",
      "RBAC (Role-Based Access Control) berbasis JWT & DB Session",
      "Audit trail logging terstruktur dengan Zap / Logrus",
      "Integrasi unit test & mock database terstandarisasi"
    ],
    keyFeatures_en: [
      "Automated server boilerplate generation via oapi-codegen",
      "RBAC security powered by JWT & database session verification",
      "Structured audit trail logging with contextual correlation IDs",
      "Standardized unit test fixtures with database mocking"
    ],
    highlights_id: [
      "Mencegah human error antara dokumentasi API dan implementasi kode",
      "Siap digunakan sebagai base template enterprise"
    ],
    highlights_en: [
      "Eliminates contract drift between documentation and live codebase",
      "Enterprise-grade modular starter architecture"
    ],
    media: [
      {
        type: "image",
        url: "https://cdn.misbakhul.com/projects/backend-openapi-gochi.png",
        caption_id: "Spec-Driven OpenAPI & Chi Router Architecture",
        caption_en: "Spec-Driven OpenAPI & Chi Router Architecture"
      }
    ]
  },
  {
    id: 7,
    slug: "ai-clipper",
    number: "07",
    title: "AI_CLIPPER",
    category: "#VIDEO_AI",
    year: "2026",
    theme: "bg-acid-green",
    text: "text-void-black",
    rotateClass: "md:-mt-6 md:-rotate-2",
    hasPattern: true,
    description_id: "Engine generator Shorts & video clipper otomatis berbasis Go dan FFmpeg. Ditenagai Google Gemini AI untuk transkripsi audio Speech-to-Text per-detik, deteksi highlight otomatis, smart-crop vertikal 9:16, silence removal, dan Web Studio dashboard interaktif.",
    description_en: "Automated video clipper & Shorts generator engine built with Go and FFmpeg. Powered by Google Gemini AI for second-by-second Speech-to-Text transcription, auto highlight detection, 9:16 vertical smart-crop, silence removal, and an interactive Web Studio dashboard.",
    tech: ["Golang", "FFmpeg", "Gemini AI", "Web Studio", "CLI", "YouTube DL"],
    links: { demo: "", github: "https://github.com/misbakhul29/clipper" },
    architecture_id: "Video processing pipeline paralel: Audio Demuxing -> Gemini AI Multimodal Processing -> FFmpeg Smart Vertical Crop Filtergraph -> Animated Subtitle Burn-in.",
    architecture_en: "High-throughput video processing pipeline: Audio Demuxing -> Gemini Multimodal Highlight Extraction -> FFmpeg 9:16 Vertical Filtergraph -> Dynamic Animated Subtitles.",
    keyFeatures_id: [
      "Transkripsi audio kata-per-kata presisi menggunakan Google Gemini AI",
      "Deteksi highlight otomatis berdasarkan emosi, tawa, dan poin penting pembicaraan",
      "Smart-crop 9:16 dengan deteksi wajah / speaker tracking",
      "Silence removal & video pacing booster otomatis",
      "Web Studio interaktif untuk preview, edit subtitle, dan export langsung"
    ],
    keyFeatures_en: [
      "Precision word-level audio transcription via Google Gemini AI",
      "Automatic viral highlight detection based on emotional cues and speaker emphasis",
      "Intelligent 9:16 vertical smart-crop with face & speaker tracking",
      "Automated silence removal & pacing acceleration",
      "Interactive Web Studio for real-time preview, subtitle fine-tuning, and export"
    ],
    highlights_id: [
      "Mengurangi waktu editing video dari 2 jam menjadi kurang dari 90 detik",
      "Rendering subtitle animasi karaoke-style otomatis"
    ],
    highlights_en: [
      "Reduces 2-hour longform editing workflows to under 90 seconds",
      "Automated karaoke-style animated subtitle burning"
    ],
    media: [
      {
        type: "image",
        url: "https://cdn.misbakhul.com/projects/clipper.png",
        caption_id: "AI Clipper Video Processing Engine & Web Studio",
        caption_en: "AI Clipper Video Processing Engine & Web Studio"
      }
    ]
  }
];

export default projects;
