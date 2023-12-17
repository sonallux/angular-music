import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trackDuration',
})
export class TrackDurationPipe implements PipeTransform {
  transform(durationMs: number): string {
    const seconds = Math.floor((durationMs / 1000) % 60);
    const minutes = Math.floor(durationMs / (1000 * 60));

    const zeroPaddedSeconds = `${seconds}`.padStart(2, '0');

    return `${minutes}:${zeroPaddedSeconds}`;
  }
}
