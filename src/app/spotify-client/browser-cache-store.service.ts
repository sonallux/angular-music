import { Injectable } from '@angular/core';
import { ICacheStore } from '@spotify/web-api-ts-sdk/src/caching/ICacheStore';
import Cookies from 'js-cookie';

// Firebase hosting only allows the `__session` cookie
// https://firebase.google.com/docs/hosting/manage-cache#using_cookies
const sessionCookieKey = '__session';

@Injectable()
export class BrowserCacheStoreService implements ICacheStore {
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
    const sessionCookie = Cookies.get(sessionCookieKey);
    if (!sessionCookie) {
      return null;
    }
    return JSON.parse(sessionCookie);
  }

  private saveSessionCookie(sessionCookie: Record<string, string>) {
    if (Object.keys(sessionCookie).length === 0) {
      Cookies.remove(sessionCookieKey);
    } else {
      Cookies.set(sessionCookieKey, JSON.stringify(sessionCookie), { expires: 365 });
    }
  }
}
