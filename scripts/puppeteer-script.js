const { createSpotifyTokenCookie } = require('./spotify');

/**
 * @param {puppeteer.Browser} browser
 * @param {{url: string, options: LHCI.CollectCommand.Options}} context
 */
module.exports = async (browser, context) => {
  // launch browser for LHCI
  const page = await browser.newPage();

  await page.setCookie(await createSpotifyTokenCookie(context.url));

  // close session for next run
  await page.close();
};
