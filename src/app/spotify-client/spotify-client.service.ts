import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { SpotifyAuthentication } from './spotify-authentication';
import { ICacheStore } from '@spotify/web-api-ts-sdk';
import { DOCUMENT } from '@angular/common';
import { REQUEST } from '../ssr.tokens';
import { Request } from 'express';

const CLIENT_ID = 'eda234756aae490988e32cb92412225d';

export const CACHE_STORE_TOKEN = new InjectionToken<ICacheStore>('spotifyCacheStoreToken');

@Injectable({
  providedIn: 'root',
})
export class SpotifyClientService {
  private readonly spotifyAuthentication: SpotifyAuthentication;

  constructor(
    @Inject(CACHE_STORE_TOKEN) cacheStore: ICacheStore,
    @Inject(DOCUMENT) document: Document,
    @Inject(REQUEST) @Optional() request: Request,
  ) {
    // TODO move somewhere else
    const host = request
      ? request.header('x-forwarded-proto') + `://` + request.header('x-forwarded-host')
      : document.location.origin;
    const redirectUri = `${host}/callback`;
    this.spotifyAuthentication = new SpotifyAuthentication(
      CLIENT_ID,
      redirectUri,
      ['user-top-read'],
      cacheStore,
    );
  }

  public async getAccessToken() {
    return this.spotifyAuthentication.getAccessToken();
  }

  public async isAuthenticated() {
    return this.spotifyAuthentication.getAccessToken().then((accessToken) => !!accessToken);
  }

  public async exchangeToken(url: string): Promise<void> {
    const searchParams = new URLSearchParams(url.split('?')[1]);
    const code = searchParams.get('code');
    if (!code) {
      throw new Error('Missing code in url');
    }
    await this.spotifyAuthentication.exchangeCode(code);
  }

  public login() {
    this.spotifyAuthentication.redirect().catch(console.log);
  }

  public logout() {
    this.spotifyAuthentication.removeAccessToken();
  }
}
