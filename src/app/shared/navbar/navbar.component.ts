import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  Breakpoint,
  TailwindBreakpointObserver,
} from '../services/tailwind-breakpoint-observer.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [NgIf, MatToolbarModule, MatButtonModule, MatIconModule, NgTemplateOutlet, AsyncPipe],
})
export class NavbarComponent {
  @Input() showBurgerMenu = false;

  @Output() burgerMenuClicked = new EventEmitter<MouseEvent>();

  protected currentBreakpoint$ = inject(TailwindBreakpointObserver).breakpoint$;
  protected readonly Breakpoint = Breakpoint;
}
