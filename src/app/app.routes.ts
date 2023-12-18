import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { LoginComponent } from './login/login.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CategoryComponent } from './pages/category/category.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { authCallbackHandler } from './spotify-client/auth-callback-handler';
import { SpotifyClientService } from './spotify-client/spotify-client.service';
import { AlbumComponent } from './pages/album/album.component';
import { ArtistComponent } from './pages/artist/artist.component';
import { logoutHandler } from './spotify-client/logout-handler';

export const routes: Routes = [
  {
    path: 'callback',
    canActivate: [authCallbackHandler],
    children: [],
  },
  {
    path: 'logout',
    canActivate: [logoutHandler],
    children: [],
  },
  {
    path: '',
    canMatch: [() => inject(SpotifyClientService).isAuthenticated()],
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        component: HomeComponent,
        title: 'Home - Angular Music',
      },
      {
        path: 'browse',
        component: BrowseComponent,
        title: 'Browse - Angular Music',
      },
      {
        path: 'category/:categoryId',
        component: CategoryComponent,
        title: 'Category - Angular Music',
      },
      {
        path: 'playlist/:playlistId',
        component: PlaylistComponent,
        title: 'Playlist - Angular Music',
      },
      {
        path: 'album/:albumId',
        component: AlbumComponent,
        title: 'Album - Angular Music',
      },
      {
        path: 'artist/:artistId',
        component: ArtistComponent,
        title: 'Artist - Angular Music',
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,
    title: 'Login - Angular Music',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
