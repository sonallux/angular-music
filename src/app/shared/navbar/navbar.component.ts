import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  Breakpoint,
  TailwindBreakpointObserver,
} from '../services/tailwind-breakpoint-observer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() showBurgerMenu = false;

  @Output() burgerMenuClicked = new EventEmitter<MouseEvent>();

  protected currentBreakpoint$ = inject(TailwindBreakpointObserver).breakpoint$;
  protected readonly Breakpoint = Breakpoint;
}
