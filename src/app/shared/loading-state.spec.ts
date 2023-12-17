import { Observable } from 'rxjs';
import { RunHelpers, TestScheduler } from 'rxjs/testing';
import { State, withLoadingState } from './loading-state';

// The ColdObservable type is only exposed from 'rxjs/internal/testing/ColdObservable' therefore recreate it
type ColdObservable = ReturnType<RunHelpers['cold']>;

describe('withLoadingState', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => expect(actual).toEqual(expected));
  });

  it('switches to loading state for second input value', () => {
    testScheduler.run(({ expectObservable, expectSubscriptions }) => {
      const [input, result] = createTestObservables('--a---b----|');

      expectObservable(result).toBe('a--b--cd---|', {
        a: { state: 'LOADING' },
        b: { state: 'SUCCESS', data: 'ax' },
        c: { state: 'LOADING' },
        d: { state: 'SUCCESS', data: 'bx' },
      });

      expectSubscriptions(input.subscriptions).toBe('^----------!');
    });
  });

  it('emits error', () => {
    testScheduler.run(({ expectObservable, expectSubscriptions }) => {
      const [input, result] = createTestObservables('--a--|', '-#');

      expectObservable(result).toBe('a--b-|', {
        a: { state: 'LOADING' },
        b: { state: 'ERROR', error: 'error' },
      });

      expectSubscriptions(input.subscriptions).toBe('^----!');
    });
  });

  it('restore after error', () => {
    testScheduler.run(({ expectObservable, expectSubscriptions }) => {
      const input = testScheduler.createColdObservable('--a---b----|');
      const result = input.pipe(
        withLoadingState((input) => {
          if (input === 'a') {
            return testScheduler.createColdObservable('-#');
          }
          return testScheduler.createColdObservable('-a|', { a: `${input}x` });
        }),
      );

      expectObservable(result).toBe('a--b--cd---|', {
        a: { state: 'LOADING' },
        b: { state: 'ERROR', error: 'error' },
        c: { state: 'LOADING' },
        d: { state: 'SUCCESS', data: 'bx' },
      });

      expectSubscriptions(input.subscriptions).toBe('^----------!');
    });
  });

  function createTestObservables(
    inputMarbles: string,
    loaderMarbles = '-a|',
  ): [ColdObservable, Observable<State<string>>] {
    const input = testScheduler.createColdObservable(inputMarbles);
    const result = input.pipe(
      withLoadingState((input) =>
        testScheduler.createColdObservable(loaderMarbles, { a: `${input}x` }),
      ),
    );

    return [input, result];
  }
});
