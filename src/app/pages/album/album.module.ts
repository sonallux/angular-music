import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './album.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AlbumComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterLink,
    MatTableModule
  ]
})
export class AlbumModule {
}
