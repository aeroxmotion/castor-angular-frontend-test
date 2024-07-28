import { lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthClientService {

  static STORAGE_TOKEN_KEY = 'spotify_token'
  static STORAGE_CODE_VERIFIER_KEY = 'spotify_code_verifier'

  static AUTHORIZE_SCOPES = [
    // Basics
    'user-read-private',
    'user-read-email',

    // Extras
    'user-library-read',
    'user-library-modify',
  ]

  constructor(private $http: HttpClient) { }

  async authorize() {
    const codeVerifier = this._generateRandomString(64)
    const hashed = await this._sha256(codeVerifier)
    const codeChallenge = this._base64encode(hashed)

    window.localStorage.setItem(SpotifyAuthClientService.STORAGE_CODE_VERIFIER_KEY, codeVerifier)

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: environment.SPOTIFY_CLIENT_ID,
      scope: SpotifyAuthClientService.AUTHORIZE_SCOPES.join(' '),
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: environment.SPOTIFY_AUTH_REDIRECT_URI,
    })

    window.location.href = `${environment.SPOTIFY_AUTH_API_BASE_URL}/authorize?${params.toString()}`
  }

  async requestToken() {
    const params = new URLSearchParams(window.location.search)
    const error = params.get('error')

    if (error) {
      throw new Error(error)
    }

    const code = params.get('code')!

    if (!code) {
      throw new Error('Missing \`code\` query param')
    }

    const codeVerifier = window.localStorage.getItem(SpotifyAuthClientService.STORAGE_CODE_VERIFIER_KEY)!

    const { access_token } = await lastValueFrom<any>(
      this.$http.post(
        `${environment.SPOTIFY_AUTH_API_BASE_URL}/api/token`,
        new URLSearchParams({
          client_id: environment.SPOTIFY_CLIENT_ID,
          grant_type: 'authorization_code',
          code,
          redirect_uri: environment.SPOTIFY_AUTH_REDIRECT_URI,
          code_verifier: codeVerifier,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        }
      ),
    )

    window.localStorage.setItem(SpotifyAuthClientService.STORAGE_TOKEN_KEY, access_token)
  }

  getToken() {
    return window.localStorage.getItem(SpotifyAuthClientService.STORAGE_TOKEN_KEY)
  }

  private _generateRandomString(length: number) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const values = crypto.getRandomValues(new Uint8Array(length))

    return values.reduce((acc, x) => acc + possible[x % possible.length], '')
  }

  private _sha256(string: string) {
    const encoder = new TextEncoder()
    const data = encoder.encode(string)

    return window.crypto.subtle.digest('SHA-256', data)
  }

  private _base64encode(buffer: ArrayBuffer) {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }
}
