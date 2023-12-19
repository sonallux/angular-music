import { inject, Injectable } from '@angular/core';
import { REQUEST, RESPONSE } from '../ssr.tokens';
import { SessionStorage } from './session-store.service';

// Firebase hosting only allows the `__session` cookie
// https://firebase.google.com/docs/hosting/manage-cache#using_cookies
const sessionCookieKey = '__session';

@Injectable()
export class ServerSessionStorage extends SessionStorage {
  // use "optional: true" to work with pre rendering and ng serve
  // https://github.com/angular/angular-cli/issues/26323
  private readonly request = inject(REQUEST, { optional: true });
  private readonly response = inject(RESPONSE, { optional: true });

  public getSessionData(): Record<string, string> | null {
    const sessionCookie = this.request?.cookies[sessionCookieKey];
    if (!sessionCookie) {
      return null;
    }
    return JSON.parse(sessionCookie);
  }

  public saveSessionData(sessionCookie: Record<string, string>) {
    if (Object.keys(sessionCookie).length === 0) {
      this.response?.clearCookie(sessionCookieKey);
    } else {
      this.response?.cookie(sessionCookieKey, JSON.stringify(sessionCookie), { maxAge: 604800000 });
    }
  }
}
