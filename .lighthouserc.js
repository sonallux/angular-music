const desktopSettings = {
  formFactor: "desktop",
  // Copied from https://github.com/GoogleChrome/lighthouse/blob/dd8feb782652a962451aab6ac255c36e897c5afd/core/config/constants.js#L69
  screenEmulation: {
    mobile: false,
    width: 1350,
    height: 940,
    deviceScaleFactor: 1,
    disabled: false,
  },
  // Copied from https://github.com/GoogleChrome/lighthouse/blob/dd8feb782652a962451aab6ac255c36e897c5afd/core/config/constants.js#L84
  emulatedUserAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
};

module.exports = {
  ci: {
    collect: {
      numberOfRuns: 5,
      puppeteerScript: "./scripts/puppetter-script.js",
      settings: {
        onlyCategories: ["performance"],
        ...(process.env["LIGHTHOUSE_DESKTOP"] ? desktopSettings : {}),

        // Always use the default mobileSlow4G as this influences the performance score heavily
        // https://github.com/GoogleChrome/lighthouse/blob/dd8feb782652a962451aab6ac255c36e897c5afd/core/config/constants.js#L21C3-L21C15
        // throttling: constants.throttling.desktopDense4G,
      },
    },
  },
};
