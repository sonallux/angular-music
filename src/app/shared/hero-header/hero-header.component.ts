import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-hero-header',
  templateUrl: './hero-header.component.html',
  styleUrls: ['./hero-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeroHeaderComponent {
  @Input({required: true}) heroData!: HeroData | null;
}

export interface HeroData {
  title: string,
  type: string,
  imageUrl: string,
}
