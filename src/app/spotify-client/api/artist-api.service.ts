import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SPOTIFY_BASE_URL_TOKEN } from '../base-url.token';
import { Artist, Artists, Page, SimplifiedAlbum, TopTracksResult } from '@spotify/web-api-ts-sdk';

@Injectable({providedIn: 'root'})
export class SpotifyArtistApi {
  constructor(
    private httpClient: HttpClient,
    @Inject(SPOTIFY_BASE_URL_TOKEN) private spotifyBaseUrl: string
  ) {
  }

  public getArtist(artistId: string) {
    return this.httpClient.get<Artist>(
      `${this.spotifyBaseUrl}/artists/${artistId}`
    );
  }

  public getArtistsAlbums(artistId: string, params: {
    include_groups?: Array<'album' | 'single' | 'appears_on' | 'compilation'>,
    market?: string,
    limit?: number,
    offset?: number
  } = {}) {
    const p = params.include_groups ? {...params, include_groups: params.include_groups?.join(',')} : params;

    return this.httpClient.get<Page<SimplifiedAlbum>>(
      `${this.spotifyBaseUrl}/artists/${artistId}/albums`,
      {params: p}
    );
  }

  public getArtistsTopTracks(artistId: string, params: { market?: string } = {}) {
    return this.httpClient.get<TopTracksResult>(
      `${this.spotifyBaseUrl}/artists/${artistId}/top-tracks`,
      {params}
    );
  }

  public getArtistsRelatedArtists(artistId: string) {
    return this.httpClient.get<Artists>(
      `${this.spotifyBaseUrl}/artists/${artistId}/related-artists`,
    );
  }
}
