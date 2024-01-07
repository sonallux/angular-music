import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { injectLazy } from 'ngxtension/inject-lazy';
import { findBestMatchingImage, Image } from '../images';

@Component({
  selector: 'app-hero-header',
  templateUrl: './hero-header.component.html',
  styleUrls: ['./hero-header.component.scss'],
  standalone: true,
  imports: [NgIf, NgOptimizedImage],
})
export class HeroHeaderComponent implements OnChanges {
  private readonly heroHeaderAnimation$ = injectLazy(
    () => import('./hero-header-animation.service'),
  );

  @Input({ required: true }) heroData!: HeroData | null;
  headerImage = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (this.heroData) {
      this.headerImage = findBestMatchingImage(192, this.heroData?.images) ?? '';
    }

    if (changes['heroData'].currentValue) {
      this.initAnimation();
    }
  }

  private initAnimation() {
    this.heroHeaderAnimation$.subscribe((animation) => {
      animation.init();
    });
  }
}

export interface HeroData {
  title: string;
  type: string;
  images: Image[];
}
