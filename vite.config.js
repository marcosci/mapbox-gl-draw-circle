import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/mapbox-gl-draw-circle/",
  build: {
    sourcemap: true,
    //  lib: {
    //   entry: path.resolve(__dirname, "src/index.js"),
    //    name: "webgis",
    //   formats: ["es", "cjs", "umd", "iife"],
    //   fileName: (format) => `index.${format}.js`,
    //},
  },
});
