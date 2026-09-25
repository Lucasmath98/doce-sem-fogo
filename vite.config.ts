import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { VitePWA } from "vite-plugin-pwa";
const isGhPages = process.env["GITHUB_PAGES"] === "true";
const base = isGhPages ? "/doce-sem-fogo/" : "/";
export default defineConfig({
  vite: {
    base,
    plugins: [
      VitePWA({
        strategies: "generateSW", registerType: "autoUpdate", injectRegister: null, filename: "sw.js", manifest: false, base, scope: base,
        devOptions: { enabled: false },
        workbox: {
          navigateFallbackDenylist: [/^\/api\//, /^\/~oauth/],
          runtimeCaching: [
            { urlPattern: ({ request }) => request.mode === "navigate", handler: "NetworkFirst", options: { cacheName: "receita-pages", networkTimeoutSeconds: 4 } },
            { urlPattern: ({ request, url }) => url.origin === self.location.origin && ["script","style","image","font"].includes(request.destination), handler: "CacheFirst", options: { cacheName: "receita-assets", expiration: { maxEntries: 80, maxAgeSeconds: 2592000 } } },
          ],
        },
      }),
    ],
  },
  tanstackStart: {
    server: { entry: "server" },
    ...(isGhPages ? { spa: { enabled: true, prerender: { outputPath: "/index.html", crawlLinks: false } } } : {}),
  },
});
