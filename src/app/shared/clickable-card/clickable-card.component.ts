import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-clickable-card',
  templateUrl: './clickable-card.component.html'
})
export class ClickableCardComponent {
  @Input({required: true}) item!: CardItem | null
}

export interface CardItem {
  title: string;
  subtitle?: string;
  imageUrl: string;
  link: string;
}
