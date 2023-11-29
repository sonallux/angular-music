import { inject, Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

export interface ReleaseDate {
  release_date: string
  release_date_precision: string
}

@Pipe({
  name: 'releaseDate'
})
export class ReleaseDatePipe implements PipeTransform {
  private readonly datePipe = inject(DatePipe);

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
      return this.datePipe.transform(date, 'MMMM, y');
    }

    if (value.release_date_precision === 'day') {
      const [year, month, day] = value.release_date.split('-');
      if (precision === 'year') {
        return year;
      }
      const date = new Date(+year, +month - 1, +day);
      return this.datePipe.transform(date, 'mediumDate');
    }

    return null;
  }
}
