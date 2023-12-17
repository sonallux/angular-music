import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { ClickableCardComponent } from './clickable-card/clickable-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { CardListComponent } from './card-list/card-list.component';
import { HeroHeaderComponent } from './hero-header/hero-header.component';
import { AlbumLinkComponent } from './album-link/album-link.component';
import { ArtistLinkComponent } from './artist-link/artist-link.component';
import { ReleaseDatePipe } from './pipes/release-date.pipe';
import { TrackDurationPipe } from './pipes/track-duration.pipe';
import { Repeat } from 'ngxtension/repeat';

@NgModule({
  declarations: [
    NavbarComponent,
    ClickableCardComponent,
    CardListComponent,
    HeroHeaderComponent,
    AlbumLinkComponent,
    ArtistLinkComponent,
    ReleaseDatePipe,
    TrackDurationPipe,
  ],
  imports: [
    CommonModule,

    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatRippleModule,
    RouterLink,
    Repeat,
  ],
  exports: [
    NavbarComponent,
    ClickableCardComponent,
    CardListComponent,
    HeroHeaderComponent,
    AlbumLinkComponent,
    ArtistLinkComponent,
    ReleaseDatePipe,
    TrackDurationPipe,
  ],
  providers: [DatePipe, ReleaseDatePipe],
})
export class SharedModule {}
