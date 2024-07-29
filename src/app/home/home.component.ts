import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { TracksTableComponent } from '../tracks-table/tracks-table.component';
import { ArtistsTableComponent } from "../artists-table/artists-table.component";
import { GetSpotifySearchResponse, SpotifyClientService, SpotifySearchType } from '../spotify-client.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, MatButton, MatInputModule, MatSelectModule, MatProgressSpinnerModule, TracksTableComponent, AsyncPipe, ArtistsTableComponent, MatTabsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  searchError = ''
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

    this.searchError = ''

    this.searchPromise = this.$spotifyClient.search({
      q: value.query,
      type: [SpotifySearchType.Track, SpotifySearchType.Artist, SpotifySearchType.Album],
    })

    this.searchPromise.catch((error) => {
      this.searchError = String(error)
    })
  }
}
