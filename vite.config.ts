import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: {
        main: "src/index.ts",
        lib: "src/lib/index.ts",
        electron: "src/electron/index.ts",
      },
      formats: ['es', 'cjs'],
      name: "libfm",
      fileName: (format, entryName) => {
        const ext = format === "cjs" ? "cjs" : "js";
        switch (entryName) {
          case "lib":
            return `lib/index.${ext}`;
          case "electron":
            return `electron/index.${ext}`;
          default:
            return `libfm.${ext}`;
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
