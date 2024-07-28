import { inject } from '@angular/core';
import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

import { SpotifyAuthClientService } from './spotify-auth-client.service';

export const spotifyTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const $spotifyAuthClient = inject(SpotifyAuthClientService)

  const spotifyToken = $spotifyAuthClient.getToken()

  if (!spotifyToken) {
    return next(req)
  }

  const nextReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${spotifyToken}`),
  })

  return next(nextReq)
}
