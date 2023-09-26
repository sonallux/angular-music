import { ActivatedRouteSnapshot, createUrlTreeFromSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { SpotifyClientService } from './spotify-client.service';

export function logoutHandler(route: ActivatedRouteSnapshot) {
  inject(SpotifyClientService).logout();
  return createUrlTreeFromSnapshot(route, ['']);
}
