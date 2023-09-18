import { ReleaseDatePipe } from './release-date.pipe';
import { DatePipe } from '@angular/common';

describe('ReleaseDatePipe', () => {
  let pipe: ReleaseDatePipe;

  beforeEach(() => {
    pipe = new ReleaseDatePipe(new DatePipe('en'));
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('formats release date with year precision', () => {
    expect(pipe.transform({release_date: '2023', release_date_precision: 'year'})).toEqual('2023');
  });

  it('formats release date with month precision', () => {
    expect(pipe.transform({release_date: '2023-04', release_date_precision: 'month'})).toEqual('April, 2023');
  });

  it('formats release date with day precision', () => {
    expect(pipe.transform({release_date: '2023-04-15', release_date_precision: 'day'})).toEqual('Apr 15, 2023');
  });
});
