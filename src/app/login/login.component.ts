import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-home',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(private oauthService: OAuthService) {
  }

  login() {
    this.oauthService.initCodeFlow();
  }
}
