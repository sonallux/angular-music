import type { AccessToken, ICachable } from "@spotify/web-api-ts-sdk";

// copied from @spotify/web-api-ts-sdk and slightly adjusted
// https://github.com/spotify/spotify-web-api-ts-sdk/blob/53c487a0fab3994e298dcd051e88162d19954bf9/src/auth/AccessTokenHelpers.ts
export class AccessTokenHelpers {
    public static async refreshCachedAccessToken(clientId: string, item: AccessToken) {
        const updated = await AccessTokenHelpers.refreshToken(clientId, item.refresh_token);
        return AccessTokenHelpers.toCachable(updated);
    }

    public static toCachable(item: AccessToken): ICachable & AccessToken {
        return { ...item, expires: Date.now() + (item.expires_in * 1000) };
    }

    private static async refreshToken(clientId: string, refreshToken: string): Promise<AccessToken> {
        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("grant_type", "refresh_token");
        params.append("refresh_token", refreshToken);

        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params
        });

        const text = await result.text();

        if (!result.ok) {
            throw new Error(`Failed to refresh token: ${result.statusText}, ${text}`);
        }

        const json: AccessToken = JSON.parse(text);
        return json;
    }

    public static generateCodeVerifier(length: number) {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    public static async generateCodeChallenge(codeVerifier: string) {
        const data = new TextEncoder().encode(codeVerifier);
        const digest = await this.crypto.subtle.digest('SHA-256', data);

        const digestBytes = [...new Uint8Array(digest)];
        const hasBuffer = typeof Buffer !== 'undefined';

        const digestAsBase64 = hasBuffer
            ? Buffer.from(digest).toString('base64')
            : btoa(String.fromCharCode.apply(null, digestBytes));

        return digestAsBase64
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    private static get crypto() {
        return this.hasSubtleCrypto ? window.crypto : this.tryLoadNodeWebCrypto();
    }

    private static get hasSubtleCrypto() {
        return typeof window !== 'undefined' && typeof window.crypto !== 'undefined' && typeof window.crypto.subtle !== 'undefined';
    }

    private static tryLoadNodeWebCrypto() {
        try {
            // Deliberately avoid bundling for browsers depending
            // on node by doing this require during execution.

            const { webcrypto } = require('crypto');
            return webcrypto;
        } catch (e) {
            throw e;
        }
    }
}


