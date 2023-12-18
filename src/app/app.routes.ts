import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { authCallbackHandler } from './spotify-client/auth-callback-handler';
import { SpotifyClientService } from './spotify-client/spotify-client.service';
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
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then((a) => a.HomeComponent),
        title: 'Home - Angular Music',
      },
      {
        path: 'browse',
        loadComponent: () =>
          import('./pages/browse/browse.component').then((a) => a.BrowseComponent),
        title: 'Browse - Angular Music',
      },
      {
        path: 'category/:categoryId',
        loadComponent: () =>
          import('./pages/category/category.component').then((a) => a.CategoryComponent),
        title: 'Category - Angular Music',
      },
      {
        path: 'playlist/:playlistId',
        loadComponent: () =>
          import('./pages/playlist/playlist.component').then((a) => a.PlaylistComponent),
        title: 'Playlist - Angular Music',
      },
      {
        path: 'album/:albumId',
        loadComponent: () => import('./pages/album/album.component').then((a) => a.AlbumComponent),
        title: 'Album - Angular Music',
      },
      {
        path: 'artist/:artistId',
        loadComponent: () =>
          import('./pages/artist/artist.component').then((a) => a.ArtistComponent),
        title: 'Artist - Angular Music',
      },
      {
        path: '**',
        loadComponent: () =>
          import('./pages/not-found/not-found.component').then((a) => a.NotFoundComponent),
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./login/login.component').then((a) => a.LoginComponent),
    title: 'Login - Angular Music',
    data: {
      hideNavigationItems: true,
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
