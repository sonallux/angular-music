import { Component, Input } from '@angular/core';
import { SimplifiedArtist } from '@spotify/web-api-ts-sdk';

@Component({
  selector: 'app-artist-link',
  templateUrl: './artist-link.component.html'
})
export class ArtistLinkComponent {
  @Input({required: true})
  set artist(artist: SimplifiedArtist | SimplifiedArtist[]) {
    this.artists = Array.isArray(artist) ? artist : [artist];
  }

  artists: SimplifiedArtist[] = []
}
