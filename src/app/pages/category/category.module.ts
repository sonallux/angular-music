import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CategoryComponent],
  imports: [CommonModule, SharedModule],
})
export class CategoryModule {}
