import { defineConfig } from "tsup";
import importAsGlobals from "@thelia/tsupconfig/importAsGlobals/index.js";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    clean: false,
    sourcemap: true,
    platform: "browser",
    globalName: "TheliaFetcher",
    target: "es2020",
    esbuildPlugins: [importAsGlobals({ react: "React" })],
  },
]);