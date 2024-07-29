import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FormatSpotifyArtistsPipe } from '../format-spotify-artists.pipe';
import { SpotifyArtist, SpotifyClientService } from '../spotify-client.service';

@Component({
  selector: 'app-artist-detail',
  standalone: true,
  imports: [MatIconModule, MatProgressSpinnerModule, FormatSpotifyArtistsPipe, AsyncPipe, DecimalPipe, RouterModule, MatButtonModule],
  templateUrl: './artist-detail.component.html',
  styleUrl: './artist-detail.component.css'
})
export class ArtistDetailComponent {
  artistDetailPromise!: Promise<SpotifyArtist>

  get artistID() {
    return this.$route.snapshot.params['id']
  }

  constructor(
    private $route: ActivatedRoute,
    private $spotifyClient: SpotifyClientService,
    public $sanitizer: DomSanitizer) {}

  artistDetailError = ''

  ngOnInit() {
    this.artistDetailPromise = this.$spotifyClient.getArtist(this.artistID)

    this.artistDetailPromise.catch((error) => {
      this.artistDetailError = String(error)
    })
  }
}
