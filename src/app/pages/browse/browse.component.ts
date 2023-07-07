import { Component } from '@angular/core';
import { BrowseApiService, CategoryObject } from 'ngx-spotify';
import { map } from 'rxjs';
import { CardItem } from '../../shared/clickable-card/clickable-card.component';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html'
})
export class BrowseComponent {
  categories$ = this.browseApiService.getCategories({country: 'DE', locale: 'en_US', limit: 50}).pipe(
    map(response => response.categories.items),
    map(categories => categories.map(categoryToCardItem))
  );

  constructor(private browseApiService: BrowseApiService) {
  }
}

function categoryToCardItem(category: CategoryObject): CardItem {
  return {
    title: category.name,
    imageUrl: category.icons[0].url,
    link: `/category/${category.id}`
  }
}
