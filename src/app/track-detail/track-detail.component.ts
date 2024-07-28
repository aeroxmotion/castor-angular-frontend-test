import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, type OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FormatSpotifyArtistsPipe } from '../format-spotify-artists.pipe';
import { SpotifyClientService, type SpotifyTrack } from '../spotify-client.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-track-detail',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatProgressSpinnerModule, AsyncPipe, FormatSpotifyArtistsPipe],
  templateUrl: './track-detail.component.html',
  styleUrl: './track-detail.component.css'
})
export class TrackDetailComponent implements OnInit {
  trackDetailPromise!: Promise<SpotifyTrack>

  get trackID() {
    return this.$route.snapshot.params['id']
  }

  constructor(
    private $route: ActivatedRoute,
    private $spotifyClient: SpotifyClientService,
    public $sanitizer: DomSanitizer) {}

  trackDetailError = ''

  ngOnInit() {
    this.trackDetailPromise = this.$spotifyClient.getTrack(this.trackID)

    this.trackDetailPromise.catch((error) => {
      this.trackDetailError = String(error)
    })
  }
}
