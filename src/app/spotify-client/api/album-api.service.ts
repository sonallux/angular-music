import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Album } from '@spotify/web-api-ts-sdk';
import { SPOTIFY_BASE_URL_TOKEN } from '../base-url.token';

@Injectable({providedIn: 'root'})
export class SpotifyAlbumApi {
  constructor(
    private httpClient: HttpClient,
    @Inject(SPOTIFY_BASE_URL_TOKEN) private spotifyBaseUrl: string
  ) {
  }

  public getAlbum(albumId: string, params: {market?: string} = {}) {
    return this.httpClient.get<Album>(
      `${this.spotifyBaseUrl}/albums/${albumId}`,
      {params}
    );
  }
}
