import { Component, EventEmitter, Output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  standalone: true,
  imports: [
    MatListModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatDividerModule,
    NgOptimizedImage,
  ],
})
export class SidenavComponent {
  @Output()
  public itemClick = new EventEmitter<MouseEvent>();
}
