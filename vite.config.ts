
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

const ROUTES = ["/", "/gallery", "/book", "/privacy"];

/**
 * Generates SEO files and injects geographic metadata
 * when valid property coordinates are configured.
 */
function seoFiles(
  siteUrl: string,
  pin: { lat: number; lng: number } | null
): Plugin {
  const base = siteUrl.replace(/\/+$/, "");
  const today = new Date().toISOString().slice(0, 10);

  const sitemap =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    ROUTES.map(
      (route) =>
        `  <url><loc>${base}${route}</loc><lastmod>${today}</lastmod><changefreq>${
          route === "/" ? "weekly" : "monthly"
        }</changefreq><priority>${
          route === "/" ? "1.0" : "0.7"
        }</priority></url>`
    ).join("\n") +
    "\n</urlset>\n";

  const robots =
    `User-agent: *\n` +
    `Allow: /\n\n` +
    `Sitemap: ${base}/sitemap.xml\n`;

  return {
    name: "olive-seo-files",

    transformIndexHtml(html) {
      if (!pin) return html;

      const geo =
        `"geo": {` +
        `"@type": "GeoCoordinates", ` +
        `"latitude": ${pin.lat}, ` +
        `"longitude": ${pin.lng}` +
        `},\n        "sameAs"`;

      return html
        .replace('"sameAs"', geo)
        .replace(
          '<meta name="geo.placename"',
          `<meta name="geo.position" content="${pin.lat};${pin.lng}" />\n` +
            `    <meta name="ICBM" content="${pin.lat}, ${pin.lng}" />\n` +
            `    <meta name="geo.placename"`
        );
    },

    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: sitemap,
      });

      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: robots,
      });
    },

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === "/robots.txt") {
          res.setHeader("Content-Type", "text/plain");
          return void res.end(robots);
        }

        if (req.url === "/sitemap.xml") {
          res.setHeader("Content-Type", "application/xml");
          return void res.end(sitemap);
        }

        next();
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // Load local .env values and GitHub Actions environment values.
  const env = loadEnv(mode, process.cwd(), "VITE_");

  const getEnv = (key: string): string =>
    process.env[key] || env[key] || "";

  // Custom domain configuration.
  const siteUrl =
    getEnv("VITE_SITE_URL") ||
    "https://olivehouse.ragolabs.com";

  // Optional property map coordinates.
  const lat = Number.parseFloat(getEnv("VITE_MAP_LAT"));
  const lng = Number.parseFloat(getEnv("VITE_MAP_LNG"));

  const pin =
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
      ? { lat, lng }
      : null;

  return {
    // Required for a custom domain hosted at its root.
    base: "/",

    plugins: [
      react(),
      tailwindcss(),
      seoFiles(siteUrl, pin),
    ],

    resolve: {
      alias: {
        "@": fileURLToPath(
          new URL("./src", import.meta.url)
        ),
      },
    },

    build: {
      target: "es2022",
      outDir: "dist",
      assetsDir: "assets",
      cssCodeSplit: true,
      sourcemap: false,

      rollupOptions: {
        output: {
          manualChunks: {
            react: [
              "react",
              "react-dom",
              "react-router-dom",
            ],
            motion: [
              "gsap",
              "gsap/ScrollTrigger",
              "lenis",
              "motion/react",
            ],
          },
        },
      },
    },
  };
});
