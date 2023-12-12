import { Component, Input } from '@angular/core';
import { Album, SimplifiedAlbum } from '@spotify/web-api-ts-sdk';

@Component({
  selector: 'app-album-link',
  templateUrl: './album-link.component.html',
  styleUrl: 'album-link.component.scss'
})
export class AlbumLinkComponent {
  @Input({required: true})
  album!: Album | SimplifiedAlbum
}
