import { defineConfig } from "tsup";
import importAsGlobals from "@thelia/tsupconfig/importAsGlobals/index.js";
import svgrPlugin from "esbuild-plugin-svgr";

export default defineConfig([
  {
    entry: ["src/index.tsx"],
    clean: false,
    dts: {
      entry: ["./src/utils/types.ts", "./src/index.tsx"],
    },
    sourcemap: true,
    platform: "browser",
    globalName: "TheliaBlocks",
    target: "es2020",
    esbuildPlugins: [
      importAsGlobals({
        react: "React",
        "react-dom": "ReactDOM",
      }),
      svgrPlugin({
        namedExport: "ReactComponent",
        exportType: "named",
      }),
    ],
  },
]);
