import { Injectable, OnDestroy } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Injectable()
export default class HeroHeaderAnimation implements OnDestroy {
  init(): void {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.enable();

    const timeline = gsap.timeline({
      scrollTrigger: {
        scroller: 'main',
        trigger: 'app-hero-header',
        scrub: true,
        start: 'top top',
        end: 200,
      },
    });

    timeline
      .to('.hero-header-card', { height: 96 }, 0)
      .to('.hero-header-image', { attr: { width: 96, height: 96 } }, 0)
      .to('.info-container', { height: 96, padding: '0.5rem' }, 0)
      .to('.info-container-title', { margin: 0 }, 0)
      .to('.info-container-content', { height: 0, overflow: 'hidden' }, 0);
  }

  ngOnDestroy(): void {
    ScrollTrigger.disable(false, true);
  }
}
