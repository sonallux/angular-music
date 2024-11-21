import { Component, EventEmitter, Output } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListItem, MatNavList } from '@angular/material/list';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  standalone: true,
  imports: [
    MatNavList,
    MatListItem,
    RouterLink,
    RouterLinkActive,
    MatIcon,
    MatDivider,
    NgOptimizedImage,
  ],
})
export class SidenavComponent {
  @Output()
  public itemClick = new EventEmitter<MouseEvent>();
}
