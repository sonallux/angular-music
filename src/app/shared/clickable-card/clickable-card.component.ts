import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-clickable-card',
  templateUrl: './clickable-card.component.html',
  standalone: true,
  imports: [NgIf, RouterLink, MatRippleModule, MatIconModule],
})
export class ClickableCardComponent {
  @Input({ required: true }) item!: CardItem | null;
  @Input({ transform: booleanAttribute }) fixedWidth = false;

  @Output() itemClick = new EventEmitter<CardItem>();
}

export interface CardItem {
  title: string;
  subtitle?: string;
  imageUrl: string;
  link: string;
}
