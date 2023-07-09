import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero-header',
  templateUrl: './hero-header.component.html',
  styleUrls: ['./hero-header.component.scss']
})
export class HeroHeaderComponent {
  @Input({required: true}) heroData!: HeroData | null;
}

export interface HeroData {
  title: string,
  type: string,
  imageUrl: string,
  description?: string,
  // TODO: add field for links and additional data
}
