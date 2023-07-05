import { Component } from '@angular/core';
import { UserApiService } from 'ngx-spotify';
import { map, shareReplay } from 'rxjs';
import { BrowseApiService, SimplifiedPlaylistObject } from 'ngx-spotify';
import { CardItem } from '../shared/clickable-card/clickable-card.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  private userInfo$ = this.userApiService.getCurrentUser().pipe(shareReplay({refCount: true}));
  userName$ = this.userInfo$.pipe(map(user => user.display_name))

  private featuredPlaylists$ = this.browseApiService.getFeaturedPlaylists({limit: 8}).pipe(
    shareReplay({refCount: true})
  );

  featuredPlaylistsMessage$ = this.featuredPlaylists$.pipe(
    map(featuredPlaylists => featuredPlaylists.message)
  )

  playlists$ = this.featuredPlaylists$.pipe(
    map(featuredPlaylists => featuredPlaylists.playlists.items),
    map(playlists => playlists.map(playlistToCardItem))
  )

  constructor(private userApiService: UserApiService,
              private browseApiService: BrowseApiService) {
  }

}

function playlistToCardItem(playlist: SimplifiedPlaylistObject): CardItem {
  return {
    title: playlist.name ?? 'Playlist',
    subtitle: playlist.description ?? 'Unknown',
    imageUrl: playlist.images[0].url,
    link: `playlist/${playlist.id}`
  }
}
