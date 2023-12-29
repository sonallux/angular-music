import {
  afterNextRender,
  Component,
  inject,
  Injector,
  Input,
  NgZone,
  OnChanges,
  runInInjectionContext,
  SimpleChanges,
} from '@angular/core';
import HeroHeaderAnimation from './hero-header-animation.service';

@Component({
  selector: 'app-hero-header',
  templateUrl: './hero-header.component.html',
  styleUrls: ['./hero-header.component.scss'],
  providers: [HeroHeaderAnimation],
})
export class HeroHeaderComponent implements OnChanges {
  @Input({ required: true }) heroData!: HeroData | null;

  private readonly injector = inject(Injector);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['heroData'].currentValue) {
      this.initAnimation();
    }
  }

  private initAnimation() {
    runInInjectionContext(this.injector, () => {
      const ngZone = inject(NgZone);
      const heroHeaderAnimation = inject(HeroHeaderAnimation);
      afterNextRender(() => {
        ngZone.runOutsideAngular(heroHeaderAnimation.init);
      });
    });
  }
}

export interface HeroData {
  title: string;
  type: string;
  imageUrl: string;
}
