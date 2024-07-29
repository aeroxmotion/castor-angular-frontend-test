import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { type SpotifyAlbum } from '../spotify-client.service';
import { FormatSpotifyArtistsPipe } from '../format-spotify-artists.pipe';

@Component({
  selector: 'app-albums-table',
  standalone: true,
  imports: [MatTableModule, FormatSpotifyArtistsPipe],
  templateUrl: './albums-table.component.html',
  styleUrl: './albums-table.component.css'
})
export class AlbumsTableComponent {
  columnsToDisplay = ['image', 'name', 'artists', 'release']

  @Input() albums: SpotifyAlbum[] = []

  constructor(private $router: Router) {}

  onAlbumClick(album: SpotifyAlbum) {
    this.$router.navigate(['album', album.id])
  }
}
