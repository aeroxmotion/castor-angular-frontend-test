import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { TracksTableComponent } from '../tracks-table/tracks-table.component';
import { GetSpotifySearchResponse, SpotifyClientService, SpotifySearchType } from '../spotify-client.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, MatButton, MatInputModule, MatSelectModule, MatProgressSpinnerModule, TracksTableComponent, AsyncPipe, TracksTableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  searchType = SpotifySearchType

  searchTypes: Array<{ label: string; value: SpotifySearchType }> = [
    {
      label: 'Canción',
      value: SpotifySearchType.Track,
    },
    {
      label: 'Artista',
      value: SpotifySearchType.Artist,
    },
    {
      label: 'Álbum',
      value: SpotifySearchType.Album,
    },
  ]

  searchForm: FormGroup

  searchPromise: Promise<GetSpotifySearchResponse> = Promise.resolve({
    tracks: { items: [] },
    artists: { items: [] },
    albums: { items: [] },
  })

  constructor(
    private $form: FormBuilder,
    private $spotifyClient: SpotifyClientService) {
    this.searchForm = this.$form.group({
      query: ['', Validators.required],
      type: [SpotifySearchType.Track, Validators.required],
    })
  }

  onFormSubmit() {
    const { value } = this.searchForm

    this.searchPromise = this.$spotifyClient.search({
      q: value.query,
      type: [value.type],
    })
  }
}
