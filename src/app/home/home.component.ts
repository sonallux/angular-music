import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  userInfo = this.httpClient.get('https://api.spotify.com/v1/me');

  constructor(private httpClient: HttpClient) {
  }

}
