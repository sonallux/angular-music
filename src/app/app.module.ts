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

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainLayoutModule,
    LoginModule,
    HomeModule,
    BrowseModule,
    NotFoundModule,
    CategoryModule,
    PlaylistModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
