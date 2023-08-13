import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainLayoutModule } from './main-layout/main-layout.module';
import { LoginModule } from './login/login.module';
import { HomeModule } from './pages/home/home.module';
import { BrowseModule } from './pages/browse/browse.module';
import { NotFoundModule } from './pages/not-found/not-found.module';
import { CategoryModule } from './pages/category/category.module';
import { PlaylistModule } from './pages/playlist/playlist.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthenticationInterceptor } from './spotify-client/authentication.interceptor';
import { CACHE_STORE_TOKEN } from './spotify-client/spotify-client.service';
import { BrowserCacheStoreService } from './spotify-client/browser-cache-store.service';
import { AlbumModule } from './pages/album/album.module';
import { ArtistModule } from './pages/artist/artist.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MainLayoutModule,
    LoginModule,
    HomeModule,
    BrowseModule,
    NotFoundModule,
    CategoryModule,
    PlaylistModule,
    AlbumModule,
    ArtistModule
  ],
  providers: [
    {
      provide: CACHE_STORE_TOKEN,
      useClass: BrowserCacheStoreService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
