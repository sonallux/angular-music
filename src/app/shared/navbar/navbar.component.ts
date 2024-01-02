import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @Input() showBurgerMenu = false;

  @Output() burgerMenuClicked = new EventEmitter<MouseEvent>();
}
