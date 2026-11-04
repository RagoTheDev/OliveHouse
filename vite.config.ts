
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

const ROUTES = ["/", "/accommodation-kigamboni", "/holiday-home-kigamboni", "/gallery", "/contact", "/book", "/privacy"];

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
          route === "/" ? "1.0" : route === "/privacy" ? "0.3" : "0.8"
        }</priority></url>`
    ).join("\n") +
    "\n</urlset>\n";

  const robots =
    `User-agent: *\n` +
    `Allow: /\n\n` +
    `Sitemap: ${base}/sitemap.xml\n`;

  const notFound =
    `<!DOCTYPE html>\n` +
    `<html>\n` +
    `<head>\n` +
    `  <meta charset="utf-8">\n` +
    `  <title>Redirecting...</title>\n` +
    `  <script>\n` +
    `    var loc = window.location.pathname;\n` +
    `    if (loc.length > 1 && loc.substr(-1) === '/') {\n` +
    `      loc = loc.substr(0, loc.length - 1);\n` +
    `    }\n` +
    `    sessionStorage.setItem('redirect', loc);\n` +
    `    window.location.replace('/');\n` +
    `  </script>\n` +
    `</head>\n` +
    `<body>\n` +
    `</body>\n` +
    `</html>\n`;

  return {
    name: "olive-seo-files",

    transformIndexHtml(html) {
      html = html.replace(/https:\/\/olive\.lmjhouse\.com/g, base);
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

    /**
     * Static hosts (GitHub Pages) only know index.html at "/". Write a copy of
     * the built page at <route>/index.html for every route so deep links and
     * crawlers get a 200 instead of a 404. 404.html stays for unknown paths.
     */
    async closeBundle() {
      const { readFile, writeFile, mkdir } = await import("node:fs/promises");
      const { join } = await import("node:path");
      const outDir = join(process.cwd(), "dist");
      let html: string;
      try {
        html = await readFile(join(outDir, "index.html"), "utf8");
      } catch {
        return;
      }
      for (const route of ROUTES) {
        if (route === "/") continue;
        const dir = join(outDir, route.slice(1));
        await mkdir(dir, { recursive: true });
        await writeFile(join(dir, "index.html"), html);
      }
      await writeFile(join(outDir, "404.html"), html);
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

      this.emitFile({
        type: "asset",
        fileName: "404.html",
        source: notFound,
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
    "https://olive.lmjhouse.com";

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
