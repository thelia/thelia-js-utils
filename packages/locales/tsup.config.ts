import { defineConfig } from "tsup";
import importAsGlobals from "@thelia/tsupconfig/importAsGlobals/index.js";

export default defineConfig([
  {
    entry: ["src/index.tsx"],
    clean: false,
    dts: { 
      entry: ["./src/types.ts"],
    },
    sourcemap: true,
    platform: "browser",
    globalName: "TheliaLocales",
    target: "es2020",
    esbuildPlugins: [importAsGlobals({ react: "React" })],
  },
]);