import { Component, inject, Input, NgZone, OnChanges, SimpleChanges } from '@angular/core';
import { NgIf } from '@angular/common';
import { injectLazy } from 'ngxtension/inject-lazy';

@Component({
  selector: 'app-hero-header',
  templateUrl: './hero-header.component.html',
  styleUrls: ['./hero-header.component.scss'],
  standalone: true,
  imports: [NgIf],
})
export class HeroHeaderComponent implements OnChanges {
  private readonly heroHeaderAnimation$ = injectLazy(
    () => import('./hero-header-animation.service'),
  );
  private readonly ngZone = inject(NgZone);

  @Input({ required: true }) heroData!: HeroData | null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['heroData'].currentValue) {
      this.initAnimation();
    }
  }

  private initAnimation() {
    this.heroHeaderAnimation$.subscribe((animation) =>
      this.ngZone.runOutsideAngular(() => animation.init()),
    );
  }
}

export interface HeroData {
  title: string;
  type: string;
  imageUrl: string;
}
