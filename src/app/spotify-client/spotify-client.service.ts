import { Injectable } from '@angular/core';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { CustomAuthStrategy } from './custom-auth-strategy';

const CLIENT_ID = 'eda234756aae490988e32cb92412225d';
const REDIRECT_URI = 'http://localhost:4200/callback';

@Injectable({
  providedIn: 'root'
})
export class SpotifyClientService {

  private readonly customAuthStrategy: CustomAuthStrategy;
  private readonly spotifyApi: SpotifyApi;

  constructor() {
    this.customAuthStrategy = new CustomAuthStrategy(CLIENT_ID, REDIRECT_URI, [ 'user-top-read']);
    this.spotifyApi = new SpotifyApi(this.customAuthStrategy, {});
  }

  public get browse() {
    return this.spotifyApi.browse;
  }

  public get currentUser() {
    return this.spotifyApi.currentUser
  }

  public get playlists() {
    return this.spotifyApi.playlists
  }

  public async isAuthenticated() {
    return this.customAuthStrategy.getAccessToken()
      .then(accessToken => !!accessToken)
  }

  public async exchangeToken(url: string): Promise<void> {
    const searchParams = new URLSearchParams(url.split('?')[1]);
    const code = searchParams.get('code');
    if (!code) {
      throw new Error("Missing code in url");
    }
    await this.customAuthStrategy.exchangeCode(code);
  }

  public login() {
    this.customAuthStrategy.redirect().catch(console.log);
  }
}
