import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Playlist } from '@spotify/web-api-ts-sdk';
import { SPOTIFY_BASE_URL_TOKEN } from '../base-url.token';

@Injectable({providedIn: 'root'})
export class SpotifyPlaylistApi {
  constructor(
    private httpClient: HttpClient,
    @Inject(SPOTIFY_BASE_URL_TOKEN) private spotifyBaseUrl: string
  ) {
  }

  public getPlaylist(playlistId: string, params: {market?: string} = {}) {
    return this.httpClient.get<Playlist>(
      `${this.spotifyBaseUrl}/playlists/${playlistId}`,
      {params}
    );
  }
}
