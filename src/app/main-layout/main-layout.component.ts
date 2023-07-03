import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';

// TailwindCSS breakpoints
// see https://tailwindcss.com/docs/responsive-design
// const BREAKPOINT_SM = '(min-width: 640px)';
const BREAKPOINT_MD = '(min-width: 768px)';
// const BREAKPOINT_LG = '(min-width: 1024px)';
// const BREAKPOINT_XL = '(min-width: 1280px)';
// const BREAKPOINT_2XL= '(min-width: 1536px)';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  public alwaysShowSideNav$: Observable<boolean>;

  constructor(
    breakpoints: BreakpointObserver
  ) {
    this.alwaysShowSideNav$ = breakpoints.observe(BREAKPOINT_MD)
      .pipe(map(breakpoint => breakpoint.matches));
  }
}
