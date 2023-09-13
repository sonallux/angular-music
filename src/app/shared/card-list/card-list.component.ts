import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { CardItem } from '../clickable-card/clickable-card.component';

const CARD_WIDTH = 176;
const GAB_WIDTH = 24;

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardListComponent implements AfterViewInit, OnDestroy {
  @Input({required: true}) cardItems!: CardItem[] | null;

  @Input({transform: booleanAttribute}) oneRow = false;

  @Output() itemClick = new EventEmitter<CardItem>();

  maxItemsForOneLine = 10;

  private resizeObserver: ResizeObserver;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private cdr: ChangeDetectorRef
  ) {
    this.resizeObserver = new ResizeObserver(this.onResize);
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }

  private onResize: ResizeObserverCallback = ([entry]) => {
    if (!this.oneRow || this.cardItems === null) {
      return;
    }

    const oldMaxItemsForOneLine = this.maxItemsForOneLine;
    this.maxItemsForOneLine = Math.floor((entry.contentBoxSize[0].inlineSize + GAB_WIDTH) / (CARD_WIDTH + GAB_WIDTH));

    // ResizeObserver does not run in Angular Zone, so trigger change detection if value has changed
    if (oldMaxItemsForOneLine !== this.maxItemsForOneLine) {
      this.cdr.detectChanges();
    }
  };
}
