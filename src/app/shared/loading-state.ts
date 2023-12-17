import {
  catchError,
  from,
  map,
  MonoTypeOperatorFunction,
  Observable,
  ObservableInput,
  of,
  OperatorFunction,
  switchMap,
  tap,
} from 'rxjs';

type StateLoading = {
  state: 'LOADING';
};

type StateError = {
  state: 'ERROR';
  error: any;
};

type StateSuccess<T> = {
  state: 'SUCCESS';
  data: T;
};

export type State<T> = Readonly<StateLoading | StateError | StateSuccess<T>>;

export function withLoadingState<IN, OUT>(
  loader: (input: IN) => ObservableInput<OUT>,
): OperatorFunction<IN, State<OUT>> {
  return (source) =>
    new Observable((destination) => {
      return source
        .pipe(
          immediateTap(() => destination.next(createLoadingState())),
          switchMap((input) =>
            from(loader(input)).pipe(
              map(createSuccessState),
              catchError((err) => of(createErrorState<OUT>(err))),
            ),
          ),
        )
        .subscribe(destination);
    });
}

function immediateTap<T>(handler: () => void): MonoTypeOperatorFunction<T> {
  return (source) =>
    new Observable((destination) => {
      // Immediately call handler
      handler();

      let firstValueReceived = false;

      return source
        .pipe(
          tap(() => {
            // Skip calling handler on first emitted value
            if (firstValueReceived) {
              handler();
            } else {
              firstValueReceived = true;
            }
          }),
        )
        .subscribe(destination);
    });
}

function createSuccessState<T>(data: T): State<T> {
  return { state: 'SUCCESS', data };
}

function createLoadingState<T>(): State<T> {
  return { state: 'LOADING' };
}

function createErrorState<T>(error: any): State<T> {
  return { state: 'ERROR', error };
}
