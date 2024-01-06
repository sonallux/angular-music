import { readdir } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import readline from 'node:readline';
import { resolve } from 'node:path';

const SRC_DIR = 'src';

/**
 * This counts the lines of code in the src folder. It does not count blank lines.
 *
 * Alternatively one could use the [cloc](https://github.com/AlDanial/cloc) tool and run it using:
 * `<cloc-executable> --include-ext='ts,html,scss' src`
 *
 * @return {Promise<number>}
 */
export async function measureLinesOfCode() {
  const files = await readdir(SRC_DIR, { withFileTypes: true, recursive: true });

  const lineCounts = await Promise.all(
    files
      .filter((dirent) => dirent.isFile())
      .map((dirent) => resolve(dirent.path, dirent.name))
      .map((file) => countLines(file)),
  );

  return lineCounts.reduce((previous, current) => previous + current, 0);
}

/**
 *
 * @param file
 * @return {Promise<number>}
 */
async function countLines(file) {
  return new Promise((resolve) => {
    let count = 0;

    readline
      .createInterface({ input: createReadStream(file) })
      .on('line', (line) => {
        if (line.trimStart().length > 0) {
          count++;
        }
      })
      .on('close', () => resolve(count));
  });
}
