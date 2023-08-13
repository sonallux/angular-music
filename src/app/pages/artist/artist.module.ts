import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistComponent } from './artist.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    ArtistComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterLink,
    MatTableModule
  ]
})
export class ArtistModule {
}
