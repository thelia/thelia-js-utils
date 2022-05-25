import { defineConfig } from "tsup";
import svgrPlugin from "esbuild-plugin-svgr";

export default defineConfig([
  {
    entry: ["src/index.tsx"],
    clean: false,
    dts: true,
    sourcemap: true,
    platform: "browser",
    globalName: "TheliaBlocks",
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

function importAsGlobals(mapping) {
  // https://stackoverflow.com/a/3561711/153718
  const escRe = (s) => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  const filter = new RegExp(
    Object.keys(mapping)
      .map((mod) => `^${escRe(mod)}$`)
      .join("|")
  );

  return {
    name: "global-imports",
    setup(build) {
      build.onResolve({ filter }, (args) => {
        if (!mapping[args.path]) {
          throw new Error("Unknown global: " + args.path);
        }
        return {
          path: args.path,
          namespace: "external-global",
        };
      });

      build.onLoad(
        {
          filter,
          namespace: "external-global",
        },
        async (args) => {
          const global = mapping[args.path];
          return {
            contents: `module.exports = ${global};`,
            loader: "js",
          };
        }
      );
    },
  };
}
