import { Pipe, PipeTransform } from '@angular/core';
import { Playlist } from '@spotify/web-api-ts-sdk';

@Pipe({
  name: 'playlistDescription',
  standalone: true,
})
export class PlaylistDescriptionPipe implements PipeTransform {
  transform(playlist: Playlist): string {
    return playlist.description.replaceAll(/<a href=spotify:(\w+):(\w+)>/g, '<a href="/$1/$2">');
  }
}
