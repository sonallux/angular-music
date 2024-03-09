import { inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

export interface ReleaseDate {
  release_date: string;
  release_date_precision: string;
}

@Pipe({
  name: 'releaseDate',
  standalone: true,
})
export class ReleaseDatePipe implements PipeTransform {
  private readonly locale = inject(LOCALE_ID);

  transform(value: ReleaseDate, precision: 'year' | 'day' = 'day'): string | null {
    if (value.release_date_precision === 'year') {
      return value.release_date;
    }

    if (value.release_date_precision === 'month') {
      const [year, month] = value.release_date.split('-');
      if (precision === 'year') {
        return year;
      }
      const date = new Date(+year, +month - 1, 1);
      return formatDate(date, 'MMMM, y', this.locale);
    }

    if (value.release_date_precision === 'day') {
      const [year, month, day] = value.release_date.split('-');
      if (precision === 'year') {
        return year;
      }
      const date = new Date(+year, +month - 1, +day);
      return formatDate(date, 'mediumDate', this.locale);
    }

    return null;
  }
}
