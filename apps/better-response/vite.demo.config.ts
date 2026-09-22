import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import { fileURLToPath } from "node:url";

// A separate build because viteSingleFile inlines dynamic imports, which rollup
// rejects for more than one input. Runs after the app build, so it must not
// empty the shared output directory.
export default defineConfig({
  root: "mcp",
  plugins: [tailwindcss(), viteSingleFile()],
  build: {
    outDir: "dist",
    emptyOutDir: false,
    rollupOptions: {
      input: fileURLToPath(new URL("./mcp/demo.html", import.meta.url)),
    },
  },
});
