import { TestBed } from '@angular/core/testing';

import { SpotifyClientService } from './spotify-client.service';

describe('SpotifyClientService', () => {
  let service: SpotifyClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotifyClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
