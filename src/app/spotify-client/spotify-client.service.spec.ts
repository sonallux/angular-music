import { TestBed } from '@angular/core/testing';

import { SpotifyClientService } from './spotify-client.service';
import { BrowserSessionStorage } from './browser-session-storage.service';
import { SessionStorage } from './session-store.service';

describe('SpotifyClientService', () => {
  let service: SpotifyClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: SessionStorage, useClass: BrowserSessionStorage }],
    });
    service = TestBed.inject(SpotifyClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
