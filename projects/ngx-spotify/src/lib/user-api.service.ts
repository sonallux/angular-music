import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SPOTIFY_BASE_URL_TOKEN } from './base-url.token';
import { Observable } from 'rxjs';
import { PrivateUserObject } from './generated/model/private-user-object';

export { PrivateUserObject } from './generated/model/private-user-object';
export { PrivateUserObjectFollowers } from './generated/model/private-user-object-followers';
export { ImageObject } from './generated/model/image-object';
export { PrivateUserObjectExternalUrls } from './generated/model/private-user-object-external-urls';
export { PrivateUserObjectExplicitContent } from './generated/model/private-user-object-explicit-content';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(
    private httpClient: HttpClient,
    @Inject(SPOTIFY_BASE_URL_TOKEN) private spotifyBaseUrl: string
  ) { }

  public getCurrentUser(): Observable<PrivateUserObject> {
    return this.httpClient.get<PrivateUserObject>(`${this.spotifyBaseUrl}/me`);
  }
}
