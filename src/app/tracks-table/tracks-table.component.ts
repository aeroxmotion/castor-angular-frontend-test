import { MatTableModule } from '@angular/material/table';
import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  @Output() trackClick = new EventEmitter<SpotifyTrack>()

  emitTrackClick(track: SpotifyTrack) {
    this.trackClick.emit(track)
  }
}
