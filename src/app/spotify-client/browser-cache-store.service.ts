import { Injectable } from '@angular/core';
import { ICacheStore } from '@spotify/web-api-ts-sdk/src/caching/ICacheStore';
import Cookies from 'js-cookie';

@Injectable()
export class BrowserCacheStoreService implements ICacheStore {
  get(key: string): string | null {
    return Cookies.get(key) ?? null;
  }

  remove(key: string): void {
    Cookies.remove(key);
  }

  set(key: string, value: string): void {
    Cookies.set(key, value, {expires: 365})
  }
}
