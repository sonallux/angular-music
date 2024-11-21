import { writeFile } from 'node:fs/promises';
import { measureLighthouse } from './measure-lighthouse.mjs';
import { measureBuildTime } from './measure-build-time.mjs';
import { measureLinesOfCode } from './measure-loc.mjs';
import { markdownTable } from 'markdown-table';

const BASE_URL =
  process.env['BASE_URL'] ??
  'https://angular-music-backend--angular-music-38a04.europe-west4.hosted.app/';
const OUT_FILE = 'measurements.md';

const content = [
  '## Performance measurements',
  markdownTable(
    [
      ['', 'Value'],
      ['Build time', `${Math.round(await measureBuildTime()) / 1000}ms`],
      ['Lines of code', await measureLinesOfCode()],
    ],
    { align: ['l', 'r'] },
  ),
  '',
  '## Lighthouse score',
  await renderLighthouseTable(BASE_URL),
];

await writeFile(OUT_FILE, content.join('\n'), { encoding: 'utf-8' });

async function renderLighthouseTable(url) {
  const data = await measureLighthouse(url);

  return markdownTable(
    [
      ['Page', 'Score desktop', 'Score mobile'],
      ...data.map(({ name, scoreDesktop, scoreMobile }) => [name, scoreDesktop, scoreMobile]),
    ],
    { align: ['l', 'r', 'r'] },
  );
}
