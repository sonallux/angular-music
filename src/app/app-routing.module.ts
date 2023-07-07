import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { HomeComponent } from './pages/home/home.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { LoginComponent } from './login/login.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    canMatch: [() => inject(OAuthService).hasValidAccessToken()],
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      }, {
        path: 'browse',
        component: BrowseComponent
      }, {
        path: '**',
        component: NotFoundComponent
      },
    ]
  }, {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,

  }, {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
