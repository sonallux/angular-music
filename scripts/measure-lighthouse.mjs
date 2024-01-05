import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { spawn } from 'node:child_process';

const LIGHTHOUSE_REPORTS_DIR = '.lighthouseci';
const PAGES = [
  { name: 'Home', path: '/home' },
  { name: 'Browse', path: '/browse' },
  { name: 'Category', path: '/category/toplists' },
  { name: 'Playlist', path: '/playlist/37i9dQZF1DX4jP4eebSWR9' },
  { name: 'Album', path: '/album/5HeOz6InVkwkXkacIGgHRa' },
  { name: 'Artist', path: '/artist/4lDiJcOJ2GLCK6p9q5BgfK' },
];

/**
 * Measure the lighthouse performance score for the given url
 *
 * @param baseUrl
 * @return {Promise<{}[]>}
 */
export async function measureLighthouse(baseUrl) {
  const data = [];

  for (const { name, path } of PAGES) {
    const url = `${baseUrl}${path}`;
    const scoreDesktop = await measureLighthouseForUrl(url, true);
    const scoreMobile = await measureLighthouseForUrl(url, false);

    data.push({ name, scoreDesktop, scoreMobile });
  }

  return data;
}

async function measureLighthouseForUrl(url, desktop) {
  await executeLighthouse(url, desktop);

  const scores = await getLighthouseScores();
  const meanScore =
    scores.slice(1, -1).reduce((previous, current) => previous + current, 0) / (scores.length - 2);

  console.log(`Lighthouse scores for ${desktop ? 'desktop' : 'mobile'} on ${url} are [${scores}]`);

  return Math.round(meanScore * 100);
}

async function getLighthouseReportFiles() {
  const files = await readdir(LIGHTHOUSE_REPORTS_DIR);
  return files
    .filter((file) => file.startsWith('lhr-') && file.endsWith('.json'))
    .map((file) => resolve(LIGHTHOUSE_REPORTS_DIR, file));
}

async function getLighthouseScores() {
  const scores = [];
  const files = await getLighthouseReportFiles();
  for (const file of files) {
    const report = JSON.parse(await readFile(file, 'utf-8'));
    scores.push(report.categories.performance.score);
  }

  return scores.sort((a, b) => a - b);
}

async function executeLighthouse(url, desktop = false) {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(
      'node',
      ['node_modules/@lhci/cli/src/cli.js', 'collect', '--url', url],
      {
        env: { ...process.env, ...(desktop ? { LIGHTHOUSE_DESKTOP: '1' } : {}) },
        stdio: 'pipe',
      },
    ).on('exit', (code) => {
      if (code !== 0) {
        reject(`Lighthouse finished with non zero exit code: ${code}`);
      } else {
        resolve();
      }
    });

    childProcess.stderr.pipe(process.stderr);
    childProcess.stdout.pipe(process.stdout);
  });
}
