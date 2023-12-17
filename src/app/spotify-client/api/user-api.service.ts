import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SPOTIFY_BASE_URL_TOKEN } from '../base-url.token';
import { User } from '@spotify/web-api-ts-sdk';

@Injectable({ providedIn: 'root' })
export class SpotifyUserApi {
  private readonly httpClient = inject(HttpClient);
  private readonly spotifyBaseUrl = inject(SPOTIFY_BASE_URL_TOKEN);

  public getCurrentUser() {
    return this.httpClient.get<User>(`${this.spotifyBaseUrl}/me`);
  }
}
