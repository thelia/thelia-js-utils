import { defineConfig } from "tsup";
import svgrPlugin from "esbuild-plugin-svgr";

export default defineConfig({
  entry: ["src/index.tsx"],

  esbuildPlugins: [
    svgrPlugin({
      namedExport: "ReactComponent",
      exportType: "named",
    }),
  ],
});
