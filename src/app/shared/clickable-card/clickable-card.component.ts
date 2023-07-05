import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-clickable-card',
  templateUrl: './clickable-card.component.html',
  styleUrls: ['./clickable-card.component.scss']
})
export class ClickableCardComponent {
  @Input({required: true}) item!: CardItem
}

export interface CardItem {
  title: string;
  subtitle: string;
  imageUrl: string;
  link: string;
}
