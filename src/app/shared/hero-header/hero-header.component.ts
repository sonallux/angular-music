import { Component, inject, Input, NgZone, OnChanges, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { injectLazy } from 'ngxtension/inject-lazy';
import { findBestMatchingImage, Image } from '../images';

@Component({
  selector: 'app-hero-header',
  templateUrl: './hero-header.component.html',
  styleUrls: ['./hero-header.component.scss'],
  standalone: true,
  imports: [NgOptimizedImage],
})
export class HeroHeaderComponent implements OnChanges {
  private readonly heroHeaderAnimation$ = injectLazy(
    () => import('./hero-header-animation.service'),
  );
  private readonly ngZone = inject(NgZone);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

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
    if (this.isBrowser) {
      this.heroHeaderAnimation$.subscribe((animation) =>
        this.ngZone.runOutsideAngular(() => animation.init()),
      );
    }
  }
}

export interface HeroData {
  title: string;
  type: string;
  images: Image[];
}
