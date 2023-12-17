import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Playlist } from '@spotify/web-api-ts-sdk';
import { SPOTIFY_BASE_URL_TOKEN } from '../base-url.token';

@Injectable({ providedIn: 'root' })
export class SpotifyPlaylistApi {
  private readonly httpClient = inject(HttpClient);
  private readonly spotifyBaseUrl = inject(SPOTIFY_BASE_URL_TOKEN);

  public getPlaylist(playlistId: string, params: { market?: string } = {}) {
    return this.httpClient.get<Playlist>(`${this.spotifyBaseUrl}/playlists/${playlistId}`, {
      params,
    });
  }
}
