import {
  AccessToken,
  emptyAccessToken,
  IAuthStrategy,
  ICachable,
  ICachingStrategy,
  SdkConfiguration
} from '@spotify/web-api-ts-sdk';
import { AccessTokenHelpers } from './access-token-helpers';

interface CachedVerifier extends ICachable {
  verifier: string;
  expiresOnAccess: boolean;
}

export class CustomAuthStrategy implements IAuthStrategy {
  private static readonly cacheKey = "spotify-sdk:CustomAuthStrategy:token";

  private configuration: SdkConfiguration | null = null;
  protected get cache(): ICachingStrategy { return this.configuration!.cachingStrategy; }

  constructor(
    protected clientId: string,
    protected redirectUri: string,
    protected scopes: string[]
  ) {
  }

  public setConfiguration(configuration: SdkConfiguration): void {
    this.configuration = configuration;
  }

  public async getAccessToken(): Promise<AccessToken | null> {
    return await this.cache.get<AccessToken>(CustomAuthStrategy.cacheKey);
  }

  public async getOrCreateAccessToken(): Promise<AccessToken> {
    return await this.cache.getOrCreate<AccessToken>(CustomAuthStrategy.cacheKey, async () => {
      await this.redirect();
      return emptyAccessToken;
    }, async (expiring) => {
      return AccessTokenHelpers.refreshCachedAccessToken(this.clientId, expiring);
    });
  }

  public removeAccessToken(): void {
    this.cache.remove(CustomAuthStrategy.cacheKey);
  }

  public async redirect(): Promise<void> {
    const verifier = AccessTokenHelpers.generateCodeVerifier(128);
    const challenge = await AccessTokenHelpers.generateCodeChallenge(verifier);

    const singleUseVerifier: CachedVerifier = { verifier, expiresOnAccess: true };
    this.cache.setCacheItem("spotify-sdk:verifier", singleUseVerifier);

    const redirectTarget = await this.generateRedirectUrlForUser(this.scopes, challenge);
    await this.configuration!.redirectionStrategy.redirect(redirectTarget);
  }

  public async exchangeCode(code: string): Promise<AccessToken> {
    const cachedItem = await this.cache.get<CachedVerifier>("spotify-sdk:verifier");
    const verifier = cachedItem?.verifier;

    if (!verifier) {
      throw new Error("No verifier found in cache - can't validate query string callback parameters.");
    }

    await this.configuration!.redirectionStrategy.onReturnFromRedirect();
    const accessToken = await this.exchangeCodeForToken(code, verifier);

    // add AccessToken to cache
    this.cache.setCacheItem(CustomAuthStrategy.cacheKey, AccessTokenHelpers.toCachable(accessToken));

    // just call getOrCreate to add the update function
    return await this.cache.getOrCreate<AccessToken>(CustomAuthStrategy.cacheKey, async () => {
      throw new Error('AccessToken not found, use redirect() and exchangeCode() to get an AccessToken')
    }, async (expiring) => {
      return AccessTokenHelpers.refreshCachedAccessToken(this.clientId, expiring);
    });
  }

  protected async generateRedirectUrlForUser(scopes: string[], challenge: string) {
    scopes = scopes ?? [];
    const scope = scopes.join(' ');

    const params = new URLSearchParams();
    params.append("client_id", this.clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", this.redirectUri);
    params.append("scope", scope);
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    return `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  protected async exchangeCodeForToken(code: string, verifier: string): Promise<AccessToken> {
    const params = new URLSearchParams();
    params.append("client_id", this.clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", this.redirectUri);
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params
    });

    const text = await result.text();

    if (!result.ok) {
      throw new Error(`Failed to exchange code for token: ${result.statusText}, ${text}`);
    }

    return JSON.parse(text);
  }
}
