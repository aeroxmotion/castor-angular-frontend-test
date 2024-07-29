import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FormatSpotifyArtistsPipe } from '../format-spotify-artists.pipe';
import { type SpotifyAlbum, SpotifyClientService } from '../spotify-client.service';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [MatButtonModule, MatProgressSpinnerModule, MatIconModule, AsyncPipe, FormatSpotifyArtistsPipe, RouterModule],
  templateUrl: './album-detail.component.html',
  styleUrl: './album-detail.component.css'
})
export class AlbumDetailComponent {
 albumDetailPromise!: Promise<SpotifyAlbum>

  get albumID() {
    return this.$route.snapshot.params['id']
  }

  constructor(
    private $route: ActivatedRoute,
    private $spotifyClient: SpotifyClientService,
    public $sanitizer: DomSanitizer) {}

  albumDetailError = ''

  ngOnInit() {
    this.albumDetailPromise = this.$spotifyClient.getAlbum(this.albumID)

    this.albumDetailPromise.catch((error) => {
      this.albumDetailError = String(error)
    })
  }
}
