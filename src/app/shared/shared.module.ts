import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { ClickableCardComponent } from './clickable-card/clickable-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { CardListComponent } from './card-list/card-list.component';

@NgModule({
  declarations: [NavbarComponent, ClickableCardComponent, CardListComponent],
  imports: [
    CommonModule,

    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatRippleModule,
    RouterLink,
  ],
  exports: [NavbarComponent, ClickableCardComponent, CardListComponent]
})
export class SharedModule {

}
