import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SPOTIFY_BASE_URL_TOKEN } from './base-url.token';
import { PagingFeaturedPlaylistObject } from './generated/model/paging-featured-playlist-object';
import { GetNewReleases200Response } from './generated/model/get-new-releases200-response';

export { PagingFeaturedPlaylistObject } from './generated/model/paging-featured-playlist-object';
export { PagingPlaylistObject } from './generated/model/paging-playlist-object';
export { SimplifiedPlaylistObject } from './generated/model/simplified-playlist-object';
export { ImageObject } from './generated/model/image-object';
export { PlaylistObjectOwner } from './generated/model/playlist-object-owner';
export { SimplifiedPlaylistObjectTracks } from './generated/model/simplified-playlist-object-tracks';
export { PlaylistObjectExternalUrls } from './generated/model/playlist-object-external-urls';
export { PublicUserObjectFollowers } from './generated/model/public-user-object-followers';
export { PublicUserObjectExternalUrls } from './generated/model/public-user-object-external-urls';

export { GetNewReleases200Response } from './generated/model/get-new-releases200-response';
export { PagingSimplifiedAlbumObject } from './generated/model/paging-simplified-album-object';
export { SimplifiedAlbumObject } from './generated/model/simplified-album-object';
export { AlbumBaseRestrictions } from './generated/model/album-base-restrictions';
export { SimplifiedArtistObject } from './generated/model/simplified-artist-object';
export { AlbumBaseExternalUrls } from './generated/model/album-base-external-urls';
export { ArtistObjectExternalUrls } from './generated/model/artist-object-external-urls';


@Injectable({providedIn: 'root'})
export class BrowseApiService {
  constructor(
    private httpClient: HttpClient,
    @Inject(SPOTIFY_BASE_URL_TOKEN) private spotifyBaseUrl: string
  ) {
  }

  public getFeaturedPlaylists(params: {
    country?: string,
    locale?: string,
    timestamp?: string,
    limit?: number,
    offset?: number
  } = {}) {
    return this.httpClient.get<PagingFeaturedPlaylistObject>(
      `${this.spotifyBaseUrl}/browse/featured-playlists`,
      {params}
    );
  }

  public getNewReleases(params: { country?: string, limit?: number, offset?: number } = {}) {
    return this.httpClient.get<GetNewReleases200Response>(
      `${this.spotifyBaseUrl}/browse/new-releases`,
      {params}
    );
  }
}
