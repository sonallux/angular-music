import {
  AccessToken,
  GenericCache,
  ICachable,
  ICacheStore,
  ICachingStrategy,
} from '@spotify/web-api-ts-sdk';
import { AccessTokenHelpers } from './access-token-helpers';

interface CachedVerifier extends ICachable {
  verifier: string;
  expiresOnAccess: boolean;
}

export class SpotifyAuthentication {
  private static readonly tokenCacheKey = 'spotify-authentication-token';
  private static readonly verifierCacheKey = 'spotify-authentication-verifier';

  protected cache: ICachingStrategy;

  constructor(
    protected clientId: string,
    protected redirectUri: string,
    protected scopes: string[],
    cacheStore: ICacheStore,
  ) {
    this.cache = new GenericCache(cacheStore, this.cacheUpdateFunctions());
  }

  public async getAccessToken(): Promise<AccessToken | null> {
    return await this.cache.get<AccessToken>(SpotifyAuthentication.tokenCacheKey);
  }

  public removeAccessToken(): void {
    this.cache.remove(SpotifyAuthentication.tokenCacheKey);
  }

  public cacheUpdateFunctions(): Map<string, (item: any) => Promise<ICachable>> {
    const updateFunctions = new Map<string, (item: any) => Promise<ICachable>>();
    updateFunctions.set(SpotifyAuthentication.tokenCacheKey, (expiring) =>
      AccessTokenHelpers.refreshCachedAccessToken(this.clientId, expiring),
    );
    return updateFunctions;
  }

  public async redirect(): Promise<void> {
    const verifier = AccessTokenHelpers.generateCodeVerifier(128);
    const challenge = await AccessTokenHelpers.generateCodeChallenge(verifier);

    const singleUseVerifier: CachedVerifier = { verifier, expiresOnAccess: true };
    this.cache.setCacheItem(SpotifyAuthentication.verifierCacheKey, singleUseVerifier);

    document.location = await this.generateRedirectUrlForUser(this.scopes, challenge);
  }

  public async exchangeCode(code: string): Promise<void> {
    const cachedItem = await this.cache.get<CachedVerifier>(SpotifyAuthentication.verifierCacheKey);
    const verifier = cachedItem?.verifier;

    if (!verifier) {
      throw new Error(
        "No verifier found in cache - can't validate query string callback parameters.",
      );
    }

    const accessToken = await this.exchangeCodeForToken(code, verifier);

    this.cache.setCacheItem(
      SpotifyAuthentication.tokenCacheKey,
      AccessTokenHelpers.toCachable(accessToken),
    );
  }

  protected async generateRedirectUrlForUser(scopes: string[], challenge: string) {
    scopes = scopes ?? [];
    const scope = scopes.join(' ');

    const params = new URLSearchParams();
    params.append('client_id', this.clientId);
    params.append('response_type', 'code');
    params.append('redirect_uri', this.redirectUri);
    params.append('scope', scope);
    params.append('code_challenge_method', 'S256');
    params.append('code_challenge', challenge);

    return `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  protected async exchangeCodeForToken(code: string, verifier: string): Promise<AccessToken> {
    const params = new URLSearchParams();
    params.append('client_id', this.clientId);
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', this.redirectUri);
    params.append('code_verifier', verifier!);

    const result = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    });

    const text = await result.text();

    if (!result.ok) {
      throw new Error(`Failed to exchange code for token: ${result.statusText}, ${text}`);
    }

    return JSON.parse(text);
  }
}
