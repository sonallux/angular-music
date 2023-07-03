import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
  ]
})
export class MainLayoutModule { }
