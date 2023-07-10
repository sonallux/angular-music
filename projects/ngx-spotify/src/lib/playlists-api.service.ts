import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SPOTIFY_BASE_URL_TOKEN } from './base-url.token';
import { PlaylistObject } from './generated/model/playlist-object';

export { PlaylistObject } from './generated/model/playlist-object';
export { ImageObject } from './generated/model/image-object';
export { PlaylistObjectFollowers } from './generated/model/playlist-object-followers';
export { PlaylistObjectOwner } from './generated/model/playlist-object-owner';
export { PlaylistObjectExternalUrls } from './generated/model/playlist-object-external-urls';
export { PlaylistObjectTracks } from './generated/model/playlist-object-tracks';
export { PublicUserObjectFollowers } from './generated/model/public-user-object-followers';
export { PublicUserObjectExternalUrls } from './generated/model/public-user-object-external-urls';
export { PlaylistTrackObject } from './generated/model/playlist-track-object';
export { PlaylistTrackObjectAddedBy } from './generated/model/playlist-track-object-added-by';
export { PlaylistTrackObjectTrack } from './generated/model/playlist-track-object-track';
export { EpisodeObject } from './generated/model/episode-object';
export { TrackObject } from './generated/model/track-object';

// TODO imports of EpisodeObject and TrackObject

@Injectable({providedIn: 'root'})
export class PlaylistsApiService {
  constructor(
    private httpClient: HttpClient,
    @Inject(SPOTIFY_BASE_URL_TOKEN) private spotifyBaseUrl: string
  ) {
  }

  public getPlaylist(playlistId: string, params: {market?: string} = {}) {
    return this.httpClient.get<PlaylistObject>(
      `${this.spotifyBaseUrl}/playlists/${playlistId}`,
      {params}
    );
  }
}
