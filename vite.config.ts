// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: { preset: "vercel" },
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 600,
    },
    // CJS/ESM interop: `use-sync-external-store/shim/with-selector` bir CJS modülü.
    // Önceden optimize edilmezse dev'de "does not provide an export named
    // 'useSyncExternalStoreWithSelector'" hatası veriyor ve istemci-only
    // rotalar (ör. /admin/login) boş kalıyor.
    optimizeDeps: {
      include: [
        "use-sync-external-store/shim",
        "use-sync-external-store/shim/with-selector",
      ],
    },
  },
});
