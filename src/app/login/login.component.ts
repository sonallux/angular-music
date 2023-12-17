import { Component } from '@angular/core';
import { SpotifyClientService } from '../spotify-client/spotify-client.service';

@Component({
  selector: 'app-home',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private spotifyClient: SpotifyClientService) {}

  login() {
    this.spotifyClient.login();
  }
}
