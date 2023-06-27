import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(oauthService: OAuthService) {
    oauthService.configure({
      loginUrl: 'https://accounts.spotify.com/authorize',
      tokenEndpoint: 'https://accounts.spotify.com/api/token',
      clientId: 'eda234756aae490988e32cb92412225d',
      redirectUri: 'http://localhost:4200',
      oidc: false,
      responseType: 'code',
      scope: 'user-top-read',
      showDebugInformation: true
    });
    oauthService.tryLoginCodeFlow().catch(console.log);
    oauthService.setupAutomaticSilentRefresh();
  }
}
