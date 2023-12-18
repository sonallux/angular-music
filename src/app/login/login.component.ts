import { Component } from '@angular/core';
import { SpotifyClientService } from '../spotify-client/spotify-client.service';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-home',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [NavbarComponent, MatButtonModule],
})
export class LoginComponent {
  constructor(private spotifyClient: SpotifyClientService) {}

  login() {
    this.spotifyClient.login();
  }
}
