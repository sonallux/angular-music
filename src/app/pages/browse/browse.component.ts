import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { CardItem } from '../../shared/clickable-card/clickable-card.component';
import { Category } from '@spotify/web-api-ts-sdk';
import { SpotifyBrowseApi } from '../../spotify-client/api/browse-api.service';
import { AsyncPipe } from '@angular/common';
import { CardListComponent } from '../../shared/card-list/card-list.component';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  standalone: true,
  imports: [CardListComponent, AsyncPipe],
})
export class BrowseComponent {
  public readonly categories$ = inject(SpotifyBrowseApi)
    .getCategories({ country: 'DE', locale: 'en_US', limit: 50 })
    .pipe(
      map((response) => response.categories.items),
      map((categories) => categories.map(categoryToCardItem)),
    );
}

function categoryToCardItem(category: Category): CardItem {
  return {
    title: category.name,
    images: category.icons,
    link: `/category/${category.id}`,
  };
}
