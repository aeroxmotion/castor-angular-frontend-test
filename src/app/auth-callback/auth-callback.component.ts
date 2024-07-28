import { Router } from '@angular/router';
import { Component, type OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SpotifyAuthClientService } from '../spotify-auth-client.service';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.css'
})
export class AuthCallbackComponent implements OnInit {
  authenticating = true;
  authenticationError = 'Unknown error';

  constructor(
    private $router: Router,
    private $spotifyAuthClient: SpotifyAuthClientService) {}

  ngOnInit(): void {
    this._startSession()
  }

  private async _startSession() {
    try {
      await this.$spotifyAuthClient.requestToken()

      setTimeout(() => {
        this.$router.navigateByUrl('')
      }, 300)
    } catch (error: any) {
      console.error(error)

      setTimeout(() => {
        this.authenticating = false
        this.authenticationError = (error as Error).message
      }, 300)
    }
  }
}
