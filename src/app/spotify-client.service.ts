import { lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyClientService {

  constructor(private $http: HttpClient) { }

  search({ q, type }: GetSpotifySearchParams) {
    return lastValueFrom(
      this.$http.get<GetSpotifySearchResponse>(`${environment.SPOTIFY_HTTP_API_BASE_URL}/search`, {
        params: {
          q,
          type: type.join(',')
        },
      }),
    )
  }

  getTrack(trackID: SpotifyID)  {
    return lastValueFrom(
      this.$http.get<SpotifyTrack>(`${environment.SPOTIFY_HTTP_API_BASE_URL}/tracks/${encodeURIComponent(trackID)}`),
    )
  }

  getArtist(artistID: SpotifyID)  {
    return lastValueFrom(
      this.$http.get<SpotifyArtist>(`${environment.SPOTIFY_HTTP_API_BASE_URL}/artists/${encodeURIComponent(artistID)}`),
    )
  }
}

export type SpotifyID = string;

export interface GetSpotifySearchParams {
  q: string;
  type: SpotifySearchType[];
}

export interface GetSpotifySearchResponse {
  tracks: { items: SpotifyTrack[] };
  artists: { items: SpotifyArtist[] };
  albums: { items: SpotifyAlbum[] };
}

export enum SpotifySearchType {
  Album = "album",
  Artist = "artist",
  Track = "track",
}

export interface SpotifyTrack {
  id: SpotifyID;
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  popularity: number;
}

export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyArtist {
  id: SpotifyID;
  name: string;
  genres: string[];
  images: SpotifyImage[];
  popularity: number;
  followers: {
    total: number;
  };
}

export interface SpotifyAlbum {
  id: SpotifyID;
  images: SpotifyImage[];
  name: string;
  artists: SpotifyArtist[];
  release_date: string;
  release_date_precision: string;
}
