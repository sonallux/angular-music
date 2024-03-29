import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { CardItem, ClickableCardComponent } from '../clickable-card/clickable-card.component';
import { NgClass } from '@angular/common';

const CARD_WIDTH = 128;
const GAB_WIDTH = 24;

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  standalone: true,
  imports: [NgClass, ClickableCardComponent],
})
export class CardListComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) items!: CardItem[] | null;

  @Input() overflow: 'wrap' | 'scroll' = 'wrap';

  @Output() itemClick = new EventEmitter<CardItem>();

  @ViewChild('container') containerElement!: ElementRef<HTMLElement>;

  maxItemsForOneLine = 3;
  skeletonItems = Array(this.maxItemsForOneLine)
    .fill(0)
    .map((_, i) => i);
  gridColsClass = 'grid-cols-3';

  private resizeObserver: ResizeObserver;

  constructor(private cdr: ChangeDetectorRef) {
    this.resizeObserver = new ResizeObserver(this.onResize);
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.containerElement.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }

  private onResize: ResizeObserverCallback = ([entry]) => {
    if (this.overflow === 'scroll') {
      return;
    }

    const oldMaxItemsForOneLine = this.maxItemsForOneLine;
    this.maxItemsForOneLine = Math.max(
      2,
      Math.floor((entry.contentBoxSize[0].inlineSize + GAB_WIDTH) / (CARD_WIDTH + GAB_WIDTH)),
    );
    this.gridColsClass = `grid-cols-${this.maxItemsForOneLine}`;
    this.skeletonItems = Array(this.maxItemsForOneLine)
      .fill(0)
      .map((_, i) => i);

    // ResizeObserver does not run in Angular Zone, so trigger change detection if value has changed
    if (oldMaxItemsForOneLine !== this.maxItemsForOneLine) {
      this.cdr.detectChanges();
    }
  };
}
