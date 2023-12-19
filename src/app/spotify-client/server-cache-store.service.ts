import { inject, Injectable } from '@angular/core';
import { ICacheStore } from '@spotify/web-api-ts-sdk/src/caching/ICacheStore';
import { REQUEST, RESPONSE } from '../ssr.tokens';

// Firebase hosting only allows the `__session` cookie
// https://firebase.google.com/docs/hosting/manage-cache#using_cookies
const sessionCookieKey = '__session';

@Injectable()
export class ServerCacheStoreService implements ICacheStore {
  // use "optional: true" to work with pre rendering and ng serve
  // https://github.com/angular/angular-cli/issues/26323
  private readonly request = inject(REQUEST, { optional: true });
  private readonly response = inject(RESPONSE, { optional: true });

  get(key: string): string | null {
    return this.getSessionCookie()?.[key] ?? null;
  }

  remove(key: string): void {
    const sessionCookie = this.getSessionCookie();
    if (sessionCookie) {
      delete sessionCookie[key];
      this.saveSessionCookie(sessionCookie);
    }
  }

  set(key: string, value: string): void {
    const sessionCookie = this.getSessionCookie() ?? {};
    sessionCookie[key] = value;
    this.saveSessionCookie(sessionCookie);
  }

  private getSessionCookie(): Record<string, string> | null {
    const sessionCookie = this.request?.cookies[sessionCookieKey];
    if (!sessionCookie) {
      return null;
    }
    return JSON.parse(sessionCookie);
  }

  private saveSessionCookie(sessionCookie: Record<string, string>) {
    if (Object.keys(sessionCookie).length === 0) {
      this.response?.clearCookie(sessionCookieKey);
    } else {
      this.response?.cookie(sessionCookieKey, JSON.stringify(sessionCookie), { maxAge: 604800000 });
    }
  }
}
