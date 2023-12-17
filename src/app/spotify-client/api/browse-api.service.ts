import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SPOTIFY_BASE_URL_TOKEN } from '../base-url.token';
import { Category, FeaturedPlaylists, NewReleases } from '@spotify/web-api-ts-sdk';
import { Categories } from '@spotify/web-api-ts-sdk/src/types';

@Injectable({ providedIn: 'root' })
export class SpotifyBrowseApi {
  private readonly httpClient = inject(HttpClient);
  private readonly spotifyBaseUrl = inject(SPOTIFY_BASE_URL_TOKEN);

  public getFeaturedPlaylists(
    params: {
      country?: string;
      locale?: string;
      timestamp?: string;
      limit?: number;
      offset?: number;
    } = {},
  ) {
    return this.httpClient.get<FeaturedPlaylists>(
      `${this.spotifyBaseUrl}/browse/featured-playlists`,
      { params },
    );
  }

  public getNewReleases(params: { country?: string; limit?: number; offset?: number } = {}) {
    return this.httpClient.get<NewReleases>(`${this.spotifyBaseUrl}/browse/new-releases`, {
      params,
    });
  }

  public getCategories(
    params: {
      country?: string;
      locale?: string;
      limit?: number;
      offset?: number;
    } = {},
  ) {
    return this.httpClient.get<Categories>(`${this.spotifyBaseUrl}/browse/categories`, { params });
  }

  public getCategory(categoryId: string, params: { country?: string; locale?: string } = {}) {
    return this.httpClient.get<Category>(`${this.spotifyBaseUrl}/browse/categories/${categoryId}`, {
      params,
    });
  }

  public getCategoriesPlaylist(
    categoryId: string,
    params: { country?: string; limit?: number; offset?: number } = {},
  ) {
    return this.httpClient.get<FeaturedPlaylists>(
      `${this.spotifyBaseUrl}/browse/categories/${categoryId}/playlists`,
      { params },
    );
  }
}
