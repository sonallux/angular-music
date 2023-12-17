import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistComponent } from './playlist.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [PlaylistComponent],
  imports: [CommonModule, SharedModule, RouterLink, MatTableModule],
})
export class PlaylistModule {}
