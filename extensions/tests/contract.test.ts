import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => readFileSync(path.join(root, file), "utf8");
const cssIn = (dir: string) => readdirSync(path.join(root, dir)).filter((file) => file.endsWith(".css")).map((file) => `${dir}/${file}`);

const declared = new Set(Array.from(read("core/tokens.css").matchAll(/(--sl-[a-z0-9-]+)\s*:/g), (match) => match[1]));
// Per-element variables that extensions set themselves; they are not part of the host contract.
/** Splits a selector list on commas that are not inside parentheses, e.g. :is(a, b). */
const splitSelectorList = (list: string) => {
  const parts: string[] = [];
  let depth = 0;
  let current = "";
  for (const character of list) {
    if (character === "(") depth++;
    if (character === ")") depth--;
    if (character === "," && depth === 0) {
      parts.push(current);
      current = "";
    } else current += character;
  }
  return [...parts, current];
};
const local = new Set(["--sl-delay", "--sl-i", "--sl-marquee-duration", "--sl-marquee-gap", "--sl-parallax-y", "--sl-parallax-scale"]);

describe("token contract", () => {
  it("every --sl-* variable an extension or adapter reads is declared in tokens.css", () => {
    const files = [...cssIn("effects"), ...cssIn("adapters"), "core/reduced-motion.css"];
    const missing = files.flatMap((file) =>
      Array.from(read(file).matchAll(/var\((--sl-[a-z0-9-]+)/g), (match) => match[1])
        .filter((name) => !declared.has(name) && !local.has(name))
        .map((name) => `${file}: ${name}`),
    );
    expect(missing).toEqual([]);
  });

  it("adapters only assign contract tokens", () => {
    const unknown = cssIn("adapters").flatMap((file) =>
      Array.from(read(file).matchAll(/(--sl-[a-z0-9-]+)\s*:/g), (match) => match[1])
        .filter((name) => !declared.has(name))
        .map((name) => `${file}: ${name}`),
    );
    expect(unknown).toEqual([]);
  });

  it("connectTheme's TokenName union matches tokens.css", () => {
    const names = Array.from(read("core/theme.ts").matchAll(/\|\s*"([a-z0-9-]+)"/g), (match) => `--sl-${match[1]}`);
    expect(new Set(names)).toEqual(declared);
  });

  it("effect styles only target opt-in [data-sl-*] hooks, never host elements", () => {
    const leaks = cssIn("effects")
      .concat("core/reduced-motion.css")
      .flatMap((file) => {
        const css = read(file).replace(/\/\*[\s\S]*?\*\//g, "").replace(/@keyframes[^{]+\{(?:[^{}]*\{[^}]*\})*[^}]*\}/g, "");
        return Array.from(css.matchAll(/([^{};]+)\{/g), (match) => match[1].trim())
          .filter((selector) => selector && !selector.startsWith("@"))
          .flatMap(splitSelectorList)
          .map((selector) => selector.trim())
          .filter((selector) => !selector.startsWith("[data-sl-"))
          .map((selector) => `${file}: ${selector}`);
      });
    expect(leaks).toEqual([]);
  });
});
