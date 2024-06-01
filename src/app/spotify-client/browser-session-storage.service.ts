import { Injectable } from '@angular/core';
import Cookies from 'js-cookie';
import { SessionStorage } from './session-store.service';

@Injectable()
export class BrowserSessionStorage extends SessionStorage {
  public getSessionData(): Record<string, string> | null {
    const sessionCookie = Cookies.get(this.sessionCookieKey);
    if (!sessionCookie) {
      return null;
    }
    return JSON.parse(sessionCookie);
  }

  public saveSessionData(sessionCookie: Record<string, string>) {
    if (Object.keys(sessionCookie).length === 0) {
      Cookies.remove(this.sessionCookieKey);
    } else {
      Cookies.set(this.sessionCookieKey, JSON.stringify(sessionCookie), { expires: 365 });
    }
  }
}
