import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SPOTIFY_BASE_URL_TOKEN } from '../base-url.token';
import { SearchResults as SpotifySearchResults } from '@spotify/web-api-ts-sdk/src/types';

@Injectable({providedIn: 'root'})
export class SpotifySearchApi {
  constructor(
    private httpClient: HttpClient,
    @Inject(SPOTIFY_BASE_URL_TOKEN) private spotifyBaseUrl: string
  ) { }

  public search(params: SearchParams) {
    return this.httpClient.get<SearchResults>(
      `${this.spotifyBaseUrl}/search`,
      {params: {...params, type: 'album,artist,playlist,track'}}
    );
  }
}

export type SearchParams = {
  q: string,
  market?: string,
  limit?: number,
  offset?: number,
  include_external?: string
}

export type SearchResults = Pick<SpotifySearchResults, 'albums'|'artists'|'playlists'|'tracks'>;
