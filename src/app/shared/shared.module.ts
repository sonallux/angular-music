import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,

    MatButtonModule,
    MatToolbarModule,
  ],
  exports: [NavbarComponent]
})
export class SharedModule {

}
