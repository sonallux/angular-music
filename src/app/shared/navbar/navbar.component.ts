import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, NgOptimizedImage],
})
export class NavbarComponent {
  @Input() showBurgerMenu = false;

  @Output() burgerMenuClicked = new EventEmitter<MouseEvent>();
}
