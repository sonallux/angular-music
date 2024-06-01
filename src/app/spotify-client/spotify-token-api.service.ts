import { crypto } from './crypto';

export interface AccessToken {
  /**
   * An access token that can be provided in subsequent calls, for example to Spotify Web API services.
   */
  access_token: string;
  /**
   * How the access token may be used: always "Bearer".
   */
  token_type: string;
  /**
   * The time period (in seconds) for which the access token is valid.
   */
  expires_in: number;
  /**
   * A refresh token to obtain a new access token
   */
  refresh_token: string;
}

export class SpotifyTokenApiService {
  constructor(
    private readonly clientId: string,
    private readonly redirectUri: string,
  ) {}

  public async generateAuthorizeUrl(
    scopes: string[] = [],
  ): Promise<{ url: string; codeVerifier: string }> {
    const codeVerifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(codeVerifier);

    const scope = scopes.join(' ');

    const params = new URLSearchParams();
    params.append('client_id', this.clientId);
    params.append('response_type', 'code');
    params.append('redirect_uri', this.redirectUri);
    params.append('scope', scope);
    params.append('code_challenge_method', 'S256');
    params.append('code_challenge', challenge);

    const url = `https://accounts.spotify.com/authorize?${params.toString()}`;

    return { url, codeVerifier };
  }

  public async exchangeCodeForToken(code: string, codeVerifier: string): Promise<AccessToken> {
    const params = new URLSearchParams();
    params.append('client_id', this.clientId);
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', this.redirectUri);
    params.append('code_verifier', codeVerifier);

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

  public async refreshToken(refreshToken: string): Promise<AccessToken> {
    const params = new URLSearchParams();
    params.append('client_id', this.clientId);
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);

    const result = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    });

    const text = await result.text();

    if (!result.ok) {
      throw new Error(`Failed to refresh token: ${result.statusText}, ${text}`);
    }

    return JSON.parse(text) as AccessToken;
  }
}

function generateCodeVerifier(length: number): string {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto().getRandomValues(new Uint8Array(length));
  return values.reduce((acc: string, x: number) => acc + possible[x % possible.length], '');
}

async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await crypto().subtle.digest('SHA-256', data);

  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}
