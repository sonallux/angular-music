import { TrackDurationPipe } from './track-duration.pipe';

describe('DurationPipe', () => {
  let pipe: TrackDurationPipe;

  beforeEach(() => {
    pipe = new TrackDurationPipe();
  });

  it('', () => {
    expect(pipe.transform(1)).toEqual('0:00');
    expect(pipe.transform(999)).toEqual('0:00');
    expect(pipe.transform(1_000)).toEqual('0:01');
    expect(pipe.transform(2_000)).toEqual('0:02');
    expect(pipe.transform(3_000)).toEqual('0:03');
    expect(pipe.transform(3_000)).toEqual('0:03');
    expect(pipe.transform(10_000)).toEqual('0:10');
    expect(pipe.transform(100_000)).toEqual('1:40');
  });
});
