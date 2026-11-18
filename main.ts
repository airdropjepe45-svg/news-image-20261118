// News-image entry (Node 22, standard library only).
//
// The entry's image is the entry.png beside this file: a one-page newspaper
// summing up the world news of Wednesday 18 November 2026. This program
// copies that image, byte for byte, to the grader's output directory as
// entry.png, so both of the grader's runs write identical bytes.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const source = join(here, 'entry.png');
const target = join(outDir, 'entry.png');

if (!existsSync(source)) {
  throw new Error('entry.png is missing next to main.ts');
}

copyFileSync(source, target);

// Guard the copy: the grader runs this program twice and both runs must
// write the same bytes, so fail loudly if the copy ever comes out short.
if (statSync(target).size !== statSync(source).size) {
  throw new Error('entry.png copy size mismatch');
}
