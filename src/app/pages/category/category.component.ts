import { Component, inject } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { CardItem } from '../../shared/clickable-card/clickable-card.component';
import { HeroData } from '../../shared/hero-header/hero-header.component';
import { Category, SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';
import { SpotifyBrowseApi } from '../../spotify-client/api/browse-api.service';
import { injectParams } from '../../shared/injectors/inject-params';
import { filterNil } from 'ngxtension/filter-nil';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent {
  private readonly browseApi = inject(SpotifyBrowseApi);
  private categoryId$ = injectParams('categoryId').pipe(filterNil());

  public readonly categoryHeroData$: Observable<HeroData> = this.categoryId$.pipe(
    switchMap((categoryId) =>
      this.browseApi.getCategory(categoryId, { country: 'DE', locale: 'en_US' }),
    ),
    map(mapCategoryToHeroData),
  );

  playlists$: Observable<CardItem[]> = this.categoryId$.pipe(
    switchMap((categoryId) =>
      this.browseApi.getCategoriesPlaylist(categoryId, { country: 'DE', limit: 50 }),
    ),
    map((response) => response.playlists.items.map(playlistToCardItem)),
  );
}

function mapCategoryToHeroData(category: Category): HeroData {
  return {
    title: category.name,
    type: 'Category',
    imageUrl: category.icons[0].url,
  };
}

function playlistToCardItem(playlist: SimplifiedPlaylist): CardItem {
  return {
    title: playlist.name,
    subtitle: playlist.description,
    imageUrl: playlist.images[0].url,
    link: `/playlist/${playlist.id}`,
  };
}
