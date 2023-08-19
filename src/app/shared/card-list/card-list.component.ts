import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CardItem } from '../clickable-card/clickable-card.component';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardListComponent {
  @Input({required: true}) cardItems!: CardItem[] | null;

}
