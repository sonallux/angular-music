import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';
import { MainLayoutModule } from './main-layout/main-layout.module';
import { LoginModule } from './login/login.module';
import { HomeModule } from './pages/home/home.module';
import { BrowseModule } from './pages/browse/browse.module';
import { NotFoundModule } from './pages/not-found/not-found.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['https://api.spotify.com/v1/'],
        sendAccessToken: true
      }
    }),
    MainLayoutModule,
    LoginModule,
    HomeModule,
    BrowseModule,
    NotFoundModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(oauthService: OAuthService) {
    oauthService.configure({
      loginUrl: 'https://accounts.spotify.com/authorize',
      tokenEndpoint: 'https://accounts.spotify.com/api/token',
      clientId: 'eda234756aae490988e32cb92412225d',
      redirectUri: 'http://localhost:4200',
      oidc: false,
      responseType: 'code',
      scope: 'user-top-read',
      userinfoEndpoint: ''
    });
    oauthService.tryLoginCodeFlow().catch(console.log);
    oauthService.setupAutomaticSilentRefresh();
  }
}
