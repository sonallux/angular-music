import { InjectionToken } from '@angular/core';

const defaultBaseUrl = 'https://api.spotify.com/v1';

export const SPOTIFY_BASE_URL_TOKEN = new InjectionToken<string>('Spotify base url', {
  factory: () => defaultBaseUrl,
});
