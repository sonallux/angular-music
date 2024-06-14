import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardItem, ClickableCardComponent } from '../clickable-card/clickable-card.component';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  standalone: true,
  imports: [ClickableCardComponent],
})
export class CardListComponent {
  @Input({ required: true }) items!: CardItem[] | null;

  @Input() overflow: 'wrap' | 'scroll' = 'wrap';

  @Output() itemClick = new EventEmitter<CardItem>();
}
