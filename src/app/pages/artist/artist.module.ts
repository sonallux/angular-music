import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistComponent } from './artist.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ArtistComponent],
  imports: [CommonModule, SharedModule, RouterLink, MatTableModule, MatButtonModule],
})
export class ArtistModule {}
