import { Component, Input, OnInit } from '@angular/core';
import { EMPTY, map, Observable } from 'rxjs';
import { CardItem } from '../../shared/clickable-card/clickable-card.component';
import { HeroData } from '../../shared/hero-header/hero-header.component';
import { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';
import { SpotifyBrowseApi } from '../../spotify-client/api/browse-api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {

  @Input({required: true})
  categoryId!: string

  categoryHeroData$: Observable<HeroData> = EMPTY;

  playlists$: Observable<CardItem[]> = EMPTY;

  constructor(private browseApi: SpotifyBrowseApi) {
  }

  ngOnInit(): void {
    this.categoryHeroData$ = this.browseApi.getCategory(this.categoryId, {country: 'DE', locale: 'en_US'}).pipe(
      map(category => ({
        title: category.name,
        type: 'Category',
        imageUrl: category.icons[0].url,
      }))
    );

    this.playlists$ = this.browseApi.getCategoriesPlaylist(this.categoryId, {country: 'DE', limit: 50}).pipe(
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
