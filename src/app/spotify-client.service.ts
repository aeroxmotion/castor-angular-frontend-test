import { lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyClientService {

  constructor(private $http: HttpClient) { }

  async login() {
    await lastValueFrom(this.$http.get(`${environment.SPOTIFY_AUTH_API_BASE_URL}/authorize`))
  }
}
