import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SPOTIFY_BASE_URL_TOKEN } from '../base-url.token';
import { SearchResults as SpotifySearchResults } from '@spotify/web-api-ts-sdk/src/types';

@Injectable({ providedIn: 'root' })
export class SpotifySearchApi {
  private readonly httpClient = inject(HttpClient);
  private readonly spotifyBaseUrl = inject(SPOTIFY_BASE_URL_TOKEN);

  public search(params: SearchParams) {
    return this.httpClient.get<SearchResults>(`${this.spotifyBaseUrl}/search`, {
      params: { ...params, type: 'album,artist,playlist,track' },
    });
  }
}

export type SearchParams = {
  q: string;
  market?: string;
  limit?: number;
  offset?: number;
  include_external?: string;
};

export type SearchResults = SpotifySearchResults<['album' | 'artist' | 'playlist' | 'track']>;
