import { defineConfig } from "tsup";
import svgrPlugin from "esbuild-plugin-svgr";

export default defineConfig({
  esbuildPlugins: [svgrPlugin()],
});
