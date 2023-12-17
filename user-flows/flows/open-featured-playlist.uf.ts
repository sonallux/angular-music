import { UserFlowProvider } from '@push-based/user-flow';
import { createSpotifyTokenCookie } from '../support';

const userFlowProvider: UserFlowProvider = {
  flowOptions: { name: 'Open featured playlist' },
  interactions: async ({ page, flow, collectOptions }) => {
    await page.setCookie(await createSpotifyTokenCookie(collectOptions.url));

    await flow.navigate(collectOptions.url, { stepName: 'Navigate to Home' });

    await page.waitForSelector('#section-featured-playlist app-clickable-card');

    await flow.startTimespan({ stepName: 'Select first featured playlist' });

    await page.click('#section-featured-playlist app-clickable-card:first-of-type');
    await page.waitForSelector('app-playlist h1');

    await flow.endTimespan();

    await flow.snapshot({ stepName: 'Playlist page' });
  },
};

module.exports = userFlowProvider;
