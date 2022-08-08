import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import { skypackResolver } from "@vinicius73/rollup-plugin-skypack-resolver";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",

  plugins: [
    replace({
      values: { "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV) },
      preventAssignment: false,
    }),
    skypackResolver({
      modules: ["axios", "react", "nanoid"],
    }),
    nodeResolve({
      browser: true,
      resolveOnly: [/^(?!.*react|.*axios|.*nanoid).*$/],
    }),
    commonjs(),

    typescript({ tsconfig: "./tsconfig.json" }),
  ],
  output: {
    dir: "dist",
    format: "esm",
    chunkFileNames: "[name]-[hash].js",
    sourcemap: true,
    manualChunks(id) {
      if (id.includes("node_modules")) {
        return "vendor";
      }
    },
  },
};
