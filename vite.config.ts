import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

const ROUTES = ["/", "/gallery", "/book", "/privacy"];

/** Emits robots.txt and sitemap.xml, and injects geo data into index.html when a pin is configured. */
function seoFiles(siteUrl: string, pin: { lat: number; lng: number } | null): Plugin {
  const base = siteUrl.replace(/\/$/, "");
  const today = new Date().toISOString().slice(0, 10);
  const sitemap =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    ROUTES.map(
      (r) =>
        `  <url><loc>${base}${r}</loc><lastmod>${today}</lastmod><changefreq>${r === "/" ? "weekly" : "monthly"}</changefreq><priority>${r === "/" ? "1.0" : "0.7"}</priority></url>`,
    ).join("\n") +
    `\n</urlset>\n`;
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`;
  return {
    name: "olive-seo-files",
    transformIndexHtml(html) {
      if (!pin) return html;
      const geo = `"geo": { "@type": "GeoCoordinates", "latitude": ${pin.lat}, "longitude": ${pin.lng} },\n        "sameAs"`;
      return html
        .replace('"sameAs"', geo)
        .replace(
          '<meta name="geo.placename"',
          `<meta name="geo.position" content="${pin.lat};${pin.lng}" />\n    <meta name="ICBM" content="${pin.lat}, ${pin.lng}" />\n    <meta name="geo.placename"`,
        );
    },
    generateBundle() {
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemap });
      this.emitFile({ type: "asset", fileName: "robots.txt", source: robots });
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === "/robots.txt") return void res.end(robots);
        if (req.url === "/sitemap.xml") {
          res.setHeader("Content-Type", "application/xml");
          return void res.end(sitemap);
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const siteUrl = env.VITE_SITE_URL || "https://olivehouse.example.com";
  const lat = Number.parseFloat(env.VITE_MAP_LAT ?? "");
  const lng = Number.parseFloat(env.VITE_MAP_LNG ?? "");
  const pin = Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null;
  return {
    plugins: [react(), tailwindcss(), seoFiles(siteUrl, pin)],
    resolve: {
      alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    },
    build: {
      target: "es2022",
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom", "react-router-dom"],
            motion: ["gsap", "gsap/ScrollTrigger", "lenis", "motion/react"],
          },
        },
      },
    },
  };
});
