import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,

    MatCardModule
  ],
})
export class HomeModule {
}
