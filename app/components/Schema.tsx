import { data as metadata } from "@/lib/metadata";

export default function Schema() {
    const baseUrl = metadata.metadataBase ? metadata.metadataBase.toString().replace(/\/$/, "") : "https://misbakhul.my.id";
    
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        "name": "Misbakhul Munir",
        "url": baseUrl,
        "image": `${baseUrl}/og-image.png`,
        "sameAs": [
            "https://github.com/misbakhul29",
            "https://twitter.com/hazart29"
        ],
        "jobTitle": "Fullstack Web Developer",
        "description": metadata.description,
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
        "name": "Misbakhul Munir Web Development",
        "url": baseUrl,
        "image": `${baseUrl}/og-image.png`,
        "description": "Professional Fullstack Web Development services using Next.js, React, and TypeScript.",
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
