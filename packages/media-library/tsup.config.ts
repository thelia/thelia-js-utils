import { defineConfig } from "tsup";
import importAsGlobals from "@thelia/tsupconfig/importAsGlobals/index.js";
import svgrPlugin from "esbuild-plugin-svgr";

export default defineConfig([
  {
    entry: ["src/index.tsx"],
    clean: false,
    dts: true,
    sourcemap: true,
    platform: "browser",
    globalName: "TheliaMediaLibraryBlock",
    target: "es2020",
    esbuildPlugins: [
      importAsGlobals({
        react: "React",
      }),
      svgrPlugin({
        namedExport: "ReactComponent",
        exportType: "named",
      }),
    ],
  },
]);
