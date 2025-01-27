import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: {
        main: "src/index.ts",
        lib: "src/lib/index.ts",
        electron: "src/electron/index.ts",
      },
      name: "libfm",
      fileName: (format, entryName) => {
        switch (entryName) {
          case "lib":
            return `lib/index.${format}.js`;
          case "electron":
            return `electron/index.${format}.js`;
          default:
            return `libfm.${format}.js`;
        }
      }
    },
    rollupOptions: {
      external: ["path", "fs", "electron"],
      output: {
        exports: "named",
        dir: "dist"
      }
    },
    sourcemap: true
  }
});
