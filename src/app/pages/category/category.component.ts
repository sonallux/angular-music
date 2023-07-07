import { Component, Input, OnInit } from '@angular/core';
import { BrowseApiService, CategoryObject, SimplifiedPlaylistObject } from 'ngx-spotify';
import { EMPTY, map, Observable } from 'rxjs';
import { CardItem } from '../../shared/clickable-card/clickable-card.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {

  @Input({required: true})
  categoryId!: string

  category$: Observable<CategoryObject> = EMPTY;

  playlists$: Observable<CardItem[]> = EMPTY;

  constructor(private browseApiService: BrowseApiService) {
  }

  ngOnInit(): void {
    this.category$ = this.browseApiService.getCategory(this.categoryId, {country: 'DE', locale: 'en_US'});
    this.playlists$ = this.browseApiService.getCategoriesPlaylist(this.categoryId, {country: 'DE', limit: 50}).pipe(
      map(response => response.playlists.items),
      map(playlists => playlists.map(playlistToCardItem))
    );
  }
}

// TODO: remove duplication, as this is copied from home.component.ts
function playlistToCardItem(playlist: SimplifiedPlaylistObject): CardItem {
  return {
    title: playlist.name ?? 'Playlist',
    subtitle: playlist.description ?? 'Unknown',
    imageUrl: playlist.images[0].url,
    link: `/playlist/${playlist.id}`
  };
}
