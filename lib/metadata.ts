import { Metadata } from "next";

export const data: Metadata = {
    title: "Misbakhul Munir",
    description: "A portfolio website for Misbakhul Munir",
    keywords: ["portfolio", "Misbakhul Munir", "web development", "next.js", "fullstack", "indonesia", "typescript", "react", "frontend", "backend", "postgres", "ui ux"],
    authors: [{ name: "Misbakhul Munir" }],
    applicationName: "Misbakhul Munir Portfolio",
    creator: "Misbakhul Munir",
    publisher: "Misbakhul Munir",
    facebook: {
        appId: "1234567890",
    },
    icons: [
        {
            rel: "icon",
            type: "image/png",
            url: "/favicon-32x32.png",
        },
    ],
    generator: "Next.js",
    manifest: "/site.webmanifest",
    abstract: "A portfolio website for Misbakhul Munir with Next.js",
    category: "portfolio",
    classification: "portfolio",
    metadataBase: new URL("https://misbakhul.my.id/"),
    robots: {
        index: true,
        follow: true,
    },
    twitter: {
        card: "summary_large_image",
        site: "@hazart29",
        creator: "@hazart29",
        description: "A portfolio website for Misbakhul Munir",
        images: [
            {
                url: "/twitter-image.png",
                width: 1200,
                height: 630,
                alt: "Misbakhul Munir Portfolio",
            },
        ],
        title: "Misbakhul Munir Portfolio",
    },
    verification: {
        google: "DnuLiQzxtqwvcHEh4T5CTTlk7DN1ayrC-45559AHQdE",
        yandex: "a5a5cb66b2a62ac4",
    },
    openGraph: {
        title: "Misbakhul Munir",
        description: "A portfolio website for Misbakhul Munir",
        url: "https://misbakhul.my.id/",
        siteName: "Misbakhul Munir Portfolio",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Misbakhul Munir Portfolio",
            },
        ],
        type: "website",
        locale: "en_US",
        countryName: "Indonesia",
        emails: ["misbakhul2904@gmail.com", "misbakhul29munir@gmail.com"],
        phoneNumbers: ["+62882008718112"],
    },
};