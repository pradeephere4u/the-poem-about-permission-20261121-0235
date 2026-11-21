// the-poem-about-permission-20261121-0235 entry (Node 22, standard library only).
// The poem is entry.txt beside this file: a short poem about agency —
// the power to ask and to be given. This program copies it to the output
// directory as entry.txt. It runs offline and writes the same bytes every run.
//
// Local test:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const source = join(repoDir, "entry.txt");

if (!existsSync(source)) {
  throw new Error("entry.txt not found beside main.ts");
}
// The gate refuses an empty text, so fail loudly instead of writing one.
if (statSync(source).size === 0) {
  throw new Error("entry.txt is empty");
}
mkdirSync(outputDir, { recursive: true });
copyFileSync(source, join(outputDir, "entry.txt"));
