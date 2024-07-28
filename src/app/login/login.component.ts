import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { SpotifyAuthClientService } from '../spotify-auth-client.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private $spotifyAuthClient: SpotifyAuthClientService) {}

  login() {
    this.$spotifyAuthClient.authorize()
  }
}
