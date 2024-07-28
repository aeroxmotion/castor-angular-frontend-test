import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { type SpotifyTrack } from '../spotify-client.service';
import { FormatSpotifyArtistsPipe } from '../format-spotify-artists.pipe';

@Component({
  selector: 'app-tracks-table',
  standalone: true,
  imports: [MatTableModule, FormatSpotifyArtistsPipe],
  templateUrl: './tracks-table.component.html',
  styleUrl: './tracks-table.component.css'
})
export class TracksTableComponent {
  columnsToDisplay = ['name', 'artists', 'album', 'popularity']

  @Input() tracks: SpotifyTrack[] = []

  constructor(private $router: Router) {}

  onTrackClick(track: SpotifyTrack) {
    this.$router.navigate(['/track', track.id])
  }
}
