import { UserFlowProvider } from '@push-based/user-flow';
import { createSpotifyTokenCookie } from '../support';

const userFlowProvider: UserFlowProvider = {
  flowOptions: { name: 'Open new release' },
  interactions: async ({ page, flow, collectOptions }) => {
    await page.setCookie(await createSpotifyTokenCookie(collectOptions.url));

    await flow.navigate(collectOptions.url, { stepName: 'Navigate to Home' });

    await page.waitForSelector('#section-new-releases app-clickable-card');

    await flow.startTimespan({ stepName: 'Select first new release' });

    await page.click('#section-new-releases app-clickable-card:first-of-type');
    await page.waitForSelector('app-album h1');

    await flow.endTimespan();

    await flow.snapshot({ stepName: 'Album page' });
  },
};

module.exports = userFlowProvider;
