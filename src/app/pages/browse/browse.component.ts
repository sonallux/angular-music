import { Component } from '@angular/core';
import { map } from 'rxjs';
import { CardItem } from '../../shared/clickable-card/clickable-card.component';
import { SpotifyClientService } from '../../spotify-client/spotify-client.service';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { Category } from '@spotify/web-api-ts-sdk';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html'
})
export class BrowseComponent {
  // TODO fix limit
  categories$ = fromPromise(this.spotifyClient.browse.getCategories('DE', 'en_US', 49)).pipe(
    map(response => response.categories.items),
    map(categories => categories.map(categoryToCardItem))
  );

  constructor(private spotifyClient: SpotifyClientService) {
  }
}

function categoryToCardItem(category: Category): CardItem {
  return {
    title: category.name,
    imageUrl: category.icons[0].url,
    link: `/category/${category.id}`
  }
}
