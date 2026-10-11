// Builds dist/extensions as an installable package ("smooth-lab-extensions"):
// ESM entry + React hook + drop-in IIFE, the full CSS bundle, and every core/effect/adapter
// stylesheet as its own file so a site can import a single effect.
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

const out = "dist/extensions";
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

await build({ entryPoints: ["extensions/index.ts"], bundle: true, format: "esm", outfile: `${out}/index.js` });
await build({
  entryPoints: ["extensions/react.ts"],
  bundle: true,
  format: "esm",
  outfile: `${out}/react.js`,
  // Share the runtime with index.js instead of bundling a second copy.
  plugins: [{ name: "external-index", setup: (b) => b.onResolve({ filter: /^\.\/index$/ }, () => ({ path: "./index.js", external: true })) }],
  external: ["react"],
});
await build({ entryPoints: ["extensions/browser.ts"], bundle: true, minify: true, format: "iife", outfile: `${out}/smooth-lab.iife.js` });
await build({ entryPoints: ["extensions/smooth-lab.css"], bundle: true, outfile: `${out}/smooth-lab.css` });
for (const dir of ["core", "effects", "adapters"]) cpSync(`extensions/${dir}`, `${out}/${dir}`, { recursive: true, filter: (src) => !src.endsWith(".ts") });

execFileSync("npx", ["tsc", "-p", "extensions/tsconfig.build.json"], { stdio: "inherit" });

const version = JSON.parse(readFileSync("package.json", "utf8")).version;
writeFileSync(
  `${out}/package.json`,
  JSON.stringify(
    {
      name: "smooth-lab-extensions",
      version,
      type: "module",
      main: "./index.js",
      types: "./index.d.ts",
      module: "./index.js",
      sideEffects: ["*.css", "./smooth-lab.iife.js"],
      exports: {
        ".": { types: "./index.d.ts", default: "./index.js" },
        "./react": { types: "./react.d.ts", default: "./react.js" },
        "./smooth-lab.css": "./smooth-lab.css",
        "./smooth-lab.iife.js": "./smooth-lab.iife.js",
        "./core/*": "./core/*",
        "./effects/*": "./effects/*",
        "./adapters/*": "./adapters/*",
      },
      peerDependencies: { react: ">=18" },
      peerDependenciesMeta: { react: { optional: true } },
      license: "MIT",
    },
    null,
    2,
  ) + "\n",
);
console.log("built", out);
