import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { injectLazy } from 'ngxtension/inject-lazy';

@Component({
  selector: 'app-hero-header',
  templateUrl: './hero-header.component.html',
  styleUrls: ['./hero-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatCardModule, NgIf, NgOptimizedImage],
})
export class HeroHeaderComponent implements OnChanges {
  private readonly heroHeaderAnimation$ = injectLazy(
    () => import('./hero-header-animation.service'),
  );

  @Input({ required: true }) heroData!: HeroData | null;

  ngOnChanges(changes: SimpleChanges): void {
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
  imageUrl: string;
}
