import { SessionStoreService } from './session-store.service';
import { AccessToken, SpotifyTokenApiService } from './spotify-token-api.service';

export interface StoredAccessToken extends AccessToken {
  /**
   * The timestamp in milliseconds since epoch this cache entry expires
   */
  expires: number;
}

const TOKEN_RENEW_WINDOW = 2 * 60 * 1000; // 2 minutes

const ACCESS_TOKEN_KEY = 'spotify-authentication-token';
const CODE_VERIFIER_KEY = 'spotify-authentication-verifier';

export class SpotifyAuthentication {
  constructor(
    private readonly spotifyTokenApiService: SpotifyTokenApiService,
    private readonly sessionStore: SessionStoreService,
  ) {}

  public async getAccessToken(): Promise<StoredAccessToken | null> {
    let accessTokenString: string | null = this.sessionStore.get(ACCESS_TOKEN_KEY);
    if (!accessTokenString) {
      return null;
    }

    let accessToken: StoredAccessToken = JSON.parse(accessTokenString);

    // If the token is close to expiring, try to refresh it with a refresh_token
    if (accessToken.expires - Date.now() < TOKEN_RENEW_WINDOW && accessToken.refresh_token) {
      try {
        const refreshedAccessToken = await this.spotifyTokenApiService.refreshToken(
          accessToken.refresh_token,
        );
        accessToken = toStoredAccessToken(refreshedAccessToken);
        this.sessionStore.set(ACCESS_TOKEN_KEY, JSON.stringify(accessToken));
      } catch (e) {
        console.error(e);
      }
    }

    // Check if the token is expired
    if (accessToken.expires <= Date.now()) {
      this.sessionStore.remove(ACCESS_TOKEN_KEY);
      return null;
    }

    return accessToken;
  }

  public removeAccessToken(): void {
    this.sessionStore.remove(ACCESS_TOKEN_KEY);
  }

  public async generateAuthorizeUrl(scopes: string[]): Promise<string> {
    const { url, codeVerifier } = await this.spotifyTokenApiService.generateAuthorizeUrl(scopes);

    this.sessionStore.set(CODE_VERIFIER_KEY, codeVerifier);

    return url;
  }

  public async exchangeCode(code: string): Promise<void> {
    const codeVerifier = this.sessionStore.get(CODE_VERIFIER_KEY);
    if (codeVerifier == null) {
      throw new Error(
        "No verifier found in cache - can't validate query string callback parameters.",
      );
    }

    // Remove verifier so it can not be used twice
    this.sessionStore.remove(CODE_VERIFIER_KEY);

    const accessToken = await this.spotifyTokenApiService.exchangeCodeForToken(code, codeVerifier);

    this.sessionStore.set(ACCESS_TOKEN_KEY, JSON.stringify(toStoredAccessToken(accessToken)));
  }
}

function toStoredAccessToken(item: AccessToken): StoredAccessToken {
  return { ...item, expires: Date.now() + item.expires_in * 1000 };
}
