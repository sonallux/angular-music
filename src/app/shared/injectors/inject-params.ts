import { map, Observable, startWith } from 'rxjs';
import { assertInInjectionContext, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

export function injectParams(key?: string): Observable<string | null> {
  assertInInjectionContext(injectParams);
  const route = inject(ActivatedRoute);
  const params = route.snapshot.params || {};

  const getParam = (params: Params) => key ? params?.[key] ?? null : params;

  return route.params.pipe(
    map(getParam),
    startWith(getParam(params))
  );
}
