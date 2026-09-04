import { data as metadata } from "@/lib/metadata";

export default function Schema() {
    const baseUrl = metadata.metadataBase ? metadata.metadataBase.toString().replace(/\/$/, "") : "https://www.misbakhul.com";

    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        "name": "Misbakhul Munir",
        "url": baseUrl,
        "image": `${baseUrl}/og-image.png`,
        "sameAs": [
            "https://github.com/misbakhul29",
            "https://twitter.com/hazart29",
            "https://www.linkedin.com/in/misbakhul2904"
        ],
        "jobTitle": "Full Stack Web Developer",
        "description": metadata.description,
        "knowsAbout": [
            "Web Development",
            "Full Stack Web Development",
            "Software Engineering",
            "Next.js",
            "React",
            "TypeScript",
            "JavaScript",
            "Golang",
            "PostgreSQL",
            "Docker",
            "VPS Deployment",
            "REST APIs"
        ],
        "knowsLanguage": ["English", "Indonesian"],
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Central Java",
            "addressCountry": "ID"
        }
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": metadata.applicationName || "Misbakhul Munir Portfolio",
        "description": metadata.description,
        "publisher": {
            "@id": `${baseUrl}/#person`
        },
        "inLanguage": "en-US"
    };

    const professionalServiceSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": `${baseUrl}/#service`,
        "name": "Misbakhul Munir Web Development Services",
        "url": baseUrl,
        "image": `${baseUrl}/og-image.png`,
        "description": "Professional Full Stack Web Development and Software Engineering services using Next.js, React, TypeScript, and Golang.",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Central Java",
            "addressCountry": "ID"
        },
        "priceRange": "$$",
        "telephone": "+62882008718112"
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@graph": [personSchema, websiteSchema, professionalServiceSchema]
                })
            }}
        />
    );
}
