import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: {
        main: "src/index.ts",
        lib: "src/lib/index.ts",
        electron: "src/electron/index.ts",
      },
      name: "filerix",
      fileName: (format, entryName) => {
        const ext = format === "cjs" ? "cjs" : "js";
        switch (entryName) {
          case "lib":
            return `lib/index.${format}.js`;
          case "electron":
            return `electron/index.${format}.js`;
          default:
            return `filerix.${format}.js`;
        }
      }
    },
    rollupOptions: {
      external: ["path", "fs", "electron", "module"],
      output: {
        exports: "named",
        dir: "dist"
      }
    },
    sourcemap: true
  }
});
