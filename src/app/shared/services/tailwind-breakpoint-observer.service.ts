import { inject, Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, Observable, shareReplay } from 'rxjs';

// TailwindCSS breakpoints
// see https://tailwindcss.com/docs/responsive-design
const BREAKPOINT_SM = '(min-width: 640px)';
const BREAKPOINT_MD = '(min-width: 768px)';
const BREAKPOINT_LG = '(min-width: 1024px)';
const BREAKPOINT_XL = '(min-width: 1280px)';
const BREAKPOINT_2XL = '(min-width: 1536px)';

export enum Breakpoint {
  XS = 0,
  SM = 1,
  MD = 2,
  LG = 3,
  XL = 4,
  XXL = 5,
}

@Injectable({providedIn: 'root'})
export class TailwindBreakpointObserver {
  public readonly breakpoint$: Observable<Breakpoint> = inject(BreakpointObserver).observe([
    BREAKPOINT_SM, BREAKPOINT_MD, BREAKPOINT_LG, BREAKPOINT_XL, BREAKPOINT_2XL
  ]).pipe(
    map(breakpointState => {
      if (breakpointState.breakpoints[BREAKPOINT_2XL]) {
        return Breakpoint.XXL;
      } else if (breakpointState.breakpoints[BREAKPOINT_XL]) {
        return Breakpoint.XL;
      } else if (breakpointState.breakpoints[BREAKPOINT_LG]) {
        return Breakpoint.LG;
      } else if (breakpointState.breakpoints[BREAKPOINT_MD]) {
        return Breakpoint.MD;
      } else if (breakpointState.breakpoints[BREAKPOINT_SM]) {
        return Breakpoint.SM;
      }
      return Breakpoint.XS;
    }),
    shareReplay({bufferSize: 1, refCount: true})
  );
}
