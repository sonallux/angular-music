import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  standalone: true,
  imports: [NgIf, MatIconModule],
})
export class SearchBoxComponent {
  private readonly searchDebounce = 300;
  private readonly searchSubject = new Subject<string>();

  @ViewChild('searchBox', { static: true }) searchBox!: ElementRef;
  @Output() onSearch = this.searchSubject.pipe(
    distinctUntilChanged(),
    debounceTime(this.searchDebounce),
  );
  @Output() onSearchFocus = new EventEmitter<string>();

  doSearch() {
    this.searchSubject.next(this.query);
  }

  doFocus() {
    this.onSearchFocus.emit(this.query);
  }

  private get query() {
    return this.searchBox.nativeElement.value;
  }

  private set query(value: string) {
    this.searchBox.nativeElement.value = value;
  }
}
