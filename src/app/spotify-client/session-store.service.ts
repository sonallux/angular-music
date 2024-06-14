import { Injectable } from '@angular/core';

export abstract class SessionStorage {
  // Firebase hosting only allows the `__session` cookie
  // https://firebase.google.com/docs/hosting/manage-cache#using_cookies
  protected sessionCookieKey = '__session';

  abstract getSessionData(): Record<string, string> | null;
  abstract saveSessionData(sessionData: Record<string, string>): void;
}

@Injectable({ providedIn: 'root' })
export class SessionStoreService {
  constructor(private sessionStorage: SessionStorage) {}

  get(key: string): string | null {
    return this.sessionStorage.getSessionData()?.[key] ?? null;
  }

  remove(key: string): void {
    const sessionCookie = this.sessionStorage.getSessionData();
    if (sessionCookie) {
      delete sessionCookie[key];
      this.sessionStorage.saveSessionData(sessionCookie);
    }
  }

  set(key: string, value: string): void {
    const sessionCookie = this.sessionStorage.getSessionData() ?? {};
    sessionCookie[key] = value;
    this.sessionStorage.saveSessionData(sessionCookie);
  }
}
