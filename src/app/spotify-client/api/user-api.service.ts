import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SPOTIFY_BASE_URL_TOKEN } from '../base-url.token';
import { User } from '@spotify/web-api-ts-sdk';

@Injectable({providedIn: 'root'})
export class SpotifyUserApi {
  constructor(
    private httpClient: HttpClient,
    @Inject(SPOTIFY_BASE_URL_TOKEN) private spotifyBaseUrl: string
  ) { }

  public getCurrentUser() {
    return this.httpClient.get<User>(`${this.spotifyBaseUrl}/me`);
  }
}
