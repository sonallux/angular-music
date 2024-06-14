let loadedCrypto: Crypto | null = null;

export function crypto(): Crypto {
  return (loadedCrypto ??= loadCrypto());
}

function loadCrypto(): Crypto {
  if (window?.crypto?.subtle !== undefined) {
    return window.crypto;
  }

  try {
    // Deliberately avoid bundling for browsers depending
    // on node by doing this require during execution.

    const { webcrypto } = require('crypto');
    return webcrypto;
  } catch (e) {
    throw e;
  }
}
