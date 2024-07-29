import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { type SpotifyArtist } from '../spotify-client.service';

@Component({
  selector: 'app-artists-table',
  standalone: true,
  imports: [MatTableModule, DecimalPipe],
  templateUrl: './artists-table.component.html',
  styleUrl: './artists-table.component.css'
})
export class ArtistsTableComponent {
  columnsToDisplay = ['avatar', 'name', 'genres', 'followers', 'popularity']

  @Input() artists: SpotifyArtist[] = []

  constructor(private $router: Router) {
    console.log(this.artists)
  }

  onArtistClick(artist: SpotifyArtist) {
    this.$router.navigate(['/artist', artist.id])
  }
}
