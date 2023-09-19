import { TestBed } from '@angular/core/testing';

import { CACHE_STORE_TOKEN, SpotifyClientService } from './spotify-client.service';
import { BrowserCacheStoreService } from './browser-cache-store.service';

describe('SpotifyClientService', () => {
  let service: SpotifyClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [
      { provide: CACHE_STORE_TOKEN, useClass: BrowserCacheStoreService }
    ]});
    service = TestBed.inject(SpotifyClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
