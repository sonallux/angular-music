import { Inject, Injectable } from '@angular/core';
import { SpotifyAuthentication } from './spotify-authentication';
import { DOCUMENT } from '@angular/common';
import { SessionStoreService } from './session-store.service';
import { SpotifyTokenApiService } from './spotify-token-api.service';

const CLIENT_ID = 'eda234756aae490988e32cb92412225d';
const SCOPES = ['user-top-read'];

@Injectable({
  providedIn: 'root',
})
export class SpotifyClientService {
  private readonly spotifyAuthentication: SpotifyAuthentication;

  constructor(sessionStoreService: SessionStoreService, @Inject(DOCUMENT) document: Document) {
    const redirectUri = `${document.location.origin}/callback`;
    this.spotifyAuthentication = new SpotifyAuthentication(
      new SpotifyTokenApiService(CLIENT_ID, redirectUri),
      sessionStoreService,
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
    this.spotifyAuthentication
      .generateAuthorizeUrl(SCOPES)
      .then((url) => (document.location = url));
  }

  public logout() {
    this.spotifyAuthentication.removeAccessToken();
  }
}
