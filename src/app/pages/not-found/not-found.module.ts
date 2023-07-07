import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { NotFoundComponent } from './not-found.component';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,

    MatButtonModule,
    RouterLink
  ],
})
export class NotFoundModule {
}
