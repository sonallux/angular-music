import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canMatch: [() => inject(OAuthService).hasValidAccessToken()],
    component: DashboardComponent
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
