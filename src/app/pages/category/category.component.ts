import { Component, Input, OnInit } from '@angular/core';
import { EMPTY, map, Observable } from 'rxjs';
import { CardItem } from '../../shared/clickable-card/clickable-card.component';
import { HeroData } from '../../shared/hero-header/hero-header.component';
import { SpotifyClientService } from '../../spotify-client/spotify-client.service';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {

  @Input({required: true})
  categoryId!: string

  categoryHeroData$: Observable<HeroData> = EMPTY;

  playlists$: Observable<CardItem[]> = EMPTY;

  constructor(private spotifyClient: SpotifyClientService) {
  }

  ngOnInit(): void {
    this.categoryHeroData$ = fromPromise(this.spotifyClient.browse.getCategory(this.categoryId, 'DE', 'en_US')).pipe(
      map(category => ({
        title: category.name,
        type: 'Category',
        imageUrl: category.icons[0].url,
      }))
    );
    // TODO fix limit
    this.playlists$ = fromPromise(this.spotifyClient.browse.getPlaylistsForCategory(this.categoryId, 'DE', 49)).pipe(
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
