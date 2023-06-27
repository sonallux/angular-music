import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

  userInfo = this.httpClient.get('https://api.spotify.com/v1/me');

  constructor(private httpClient: HttpClient) {
  }

}
