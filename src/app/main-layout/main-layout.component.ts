import { Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Breakpoint, TailwindBreakpointObserver } from '../shared/services/tailwind-breakpoint-observer.service';
import { SearchResults, SpotifySearchApi } from '../spotify-client/api/search-api.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  public alwaysShowSideNav$: Observable<boolean>;
  public showSearchResults = false;

  searchResults$: Observable<SearchResults> | undefined;
  @ViewChildren('searchResultsView, searchBox', {read: ElementRef})
  searchElements!: QueryList<ElementRef>;

  constructor(
    private searchApi: SpotifySearchApi,
    breakpointObserver: TailwindBreakpointObserver
  ) {
    this.alwaysShowSideNav$ = breakpointObserver.breakpoint$.pipe(
      map(breakpoint => breakpoint >= Breakpoint.MD)
    );
  }

  @HostListener('click', ['$event.target'])
  onClick(eventTarget: HTMLElement) {
    // Hide the search results if we clicked outside both the "search box" and the "search results"
    if (
      this.showSearchResults &&
      !this.searchElements.some(element => element.nativeElement.contains(eventTarget))
    ) {
      this.hideSearchResults();
    }

    return true;
  }

  public doSearch(query: string, fromFocus = false) {
    if (this.showSearchResults && fromFocus) {
      return;
    }

    this.searchResults$ = this.searchApi.search({q: query});
    this.showSearchResults = !!query;
  }

  hideSearchResults() {
    this.showSearchResults = false;
  }
}
