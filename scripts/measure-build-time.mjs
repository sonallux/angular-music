import { spawn } from 'node:child_process';
import { rm } from 'node:fs/promises';

const NUMBER_OF_RUNS = 5;
const DIRS_TO_CLEANUP = ['dist', '.angular'];

/**
 * Measure the time for a `ng build`
 *
 * @return {Promise<number>} duration in milliseconds
 */
export async function measureBuildTime() {
  const durations = [];
  for (let i = 0; i < NUMBER_OF_RUNS; i++) {
    const { duration } = await executeBuild();
    durations.push(duration);

    console.log(`Run ${i + 1} finished in ${duration}ms`);
  }

  durations.sort((a, b) => a - b);
  const meanDuration =
    durations.slice(1, -1).reduce((previous, current) => previous + current, 0) /
    (NUMBER_OF_RUNS - 2);

  console.log(`Finished all builds: ${durations}`);
  console.log(`Mean duration: ${meanDuration}`);

  return meanDuration;
}

async function executeBuild() {
  await Promise.all(DIRS_TO_CLEANUP.map((dir) => rm(dir, { recursive: true, force: true })));

  return new Promise((resolve, reject) => {
    const start = Date.now();
    spawn('node', ['node_modules/@angular/cli/bin/ng.js', 'build']).on('exit', (code) => {
      const end = Date.now();
      if (code !== 0) {
        reject(`Angular build finished with non zero exit code: ${code}`);
      } else {
        resolve({
          duration: end - start,
        });
      }
    });
  });
}
