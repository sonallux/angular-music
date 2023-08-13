import { Component } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { CardItem } from '../../shared/clickable-card/clickable-card.component';
import { HeroData } from '../../shared/hero-header/hero-header.component';
import { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';
import { SpotifyBrowseApi } from '../../spotify-client/api/browse-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent {

  categoryHeroData$: Observable<HeroData>;

  playlists$: Observable<CardItem[]>;

  constructor(
    private browseApi: SpotifyBrowseApi,
    activatedRoute: ActivatedRoute
  ) {
    const categoryId$ = activatedRoute.params.pipe(map(params => params['categoryId']));

    this.categoryHeroData$ = categoryId$.pipe(
      switchMap(categoryId => this.browseApi.getCategory(categoryId, {country: 'DE', locale: 'en_US'})),
      map(category => ({
        title: category.name,
        type: 'Category',
        imageUrl: category.icons[0].url,
      }))
    );

    this.playlists$ = categoryId$.pipe(
      switchMap(categoryId => this.browseApi.getCategoriesPlaylist(categoryId, {country: 'DE', limit: 50})),
      map(response => response.playlists.items),
      map(playlists => playlists.map(playlistToCardItem))
    );
  }
}

// TODO: remove duplication, as this is copied from home.component.ts
function playlistToCardItem(playlist: SimplifiedPlaylist): CardItem {
  return {
    title: playlist.name,
    subtitle: playlist.description,
    imageUrl: playlist.images[0].url,
    link: `/playlist/${playlist.id}`
  };
}
