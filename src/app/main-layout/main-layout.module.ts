import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SharedModule } from '../shared/shared.module';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchBoxComponent } from './search-box/search-box.component';

@NgModule({
  declarations: [MainLayoutComponent, SidenavComponent, SearchResultComponent, SearchBoxComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,

    MatButtonModule,
    MatListModule,
    MatIconModule,
  ],
  exports: [MainLayoutComponent],
})
export class MainLayoutModule {}
