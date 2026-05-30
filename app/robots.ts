import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: ["/", "/about", "/projects"],
        },
        sitemap: "https://www.misbakhul.com/sitemap.xml",
    };
}
