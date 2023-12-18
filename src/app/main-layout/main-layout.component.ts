import {
  Component,
  ElementRef,
  HostListener,
  inject,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  Breakpoint,
  TailwindBreakpointObserver,
} from '../shared/services/tailwind-breakpoint-observer.service';
import { SearchResults, SpotifySearchApi } from '../spotify-client/api/search-api.service';
import { injectNavigationEnd } from 'ngxtension/navigation-end';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { SearchResultComponent } from './search-result/search-result.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SearchBoxComponent } from './search-box/search-box.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  standalone: true,
  imports: [
    NavbarComponent,
    SearchBoxComponent,
    MatSidenavModule,
    SidenavComponent,
    NgIf,
    SearchResultComponent,
    RouterOutlet,
    AsyncPipe,
  ],
})
export class MainLayoutComponent {
  public readonly alwaysShowSideNav$: Observable<boolean> = inject(
    TailwindBreakpointObserver,
  ).breakpoint$.pipe(map((breakpoint) => breakpoint >= Breakpoint.MD));
  public showSearchResults = false;

  public searchResults$: Observable<SearchResults> | undefined;

  @ViewChild('scrollContainer', { read: ElementRef })
  public scrollContainer?: ElementRef<HTMLElement>;

  @ViewChildren('searchResultsView, searchBox', { read: ElementRef })
  public searchElements!: QueryList<ElementRef>;

  private readonly searchApi = inject(SpotifySearchApi);

  constructor() {
    // Navigating to same page, does not scroll to top, so do it manually after navigation
    injectNavigationEnd()
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.scrollContainer?.nativeElement.scrollTo({ top: 0, left: 0 });
      });
  }

  @HostListener('click', ['$event.target'])
  onClick(eventTarget: HTMLElement) {
    // Hide the search results if we clicked outside both the "search box" and the "search results"
    if (
      this.showSearchResults &&
      !this.searchElements.some((element) => element.nativeElement.contains(eventTarget))
    ) {
      this.hideSearchResults();
    }

    return true;
  }

  public doSearch(query: string, fromFocus = false) {
    if (this.showSearchResults && fromFocus) {
      return;
    }

    this.searchResults$ = this.searchApi.search({ q: query, limit: 10 });
    this.showSearchResults = !!query;
  }

  hideSearchResults() {
    this.showSearchResults = false;
  }
}
