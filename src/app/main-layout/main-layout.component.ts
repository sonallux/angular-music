import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Breakpoint, TailwindBreakpointObserver } from '../shared/services/tailwind-breakpoint-observer.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  public alwaysShowSideNav$: Observable<boolean>;

  constructor(
    breakpointObserver: TailwindBreakpointObserver
  ) {
    this.alwaysShowSideNav$ = breakpointObserver.breakpoint$.pipe(
      map(breakpoint => breakpoint >= Breakpoint.MD)
    );
  }
}
