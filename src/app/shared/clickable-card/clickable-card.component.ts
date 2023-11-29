import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-clickable-card',
  templateUrl: './clickable-card.component.html'
})
export class ClickableCardComponent {
  @Input({required: true}) item!: CardItem | null
  @Input({transform: booleanAttribute}) fixedWidth = false;

  @Output() itemClick = new EventEmitter<CardItem>();
}

export interface CardItem {
  title: string;
  subtitle?: string;
  imageUrl: string;
  link: string;
}
