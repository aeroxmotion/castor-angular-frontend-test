import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { SpotifyAuthClientService } from './spotify-auth-client.service';

export const spotifyAuthGuard: CanActivateFn = (route, _) => {
  const $router = inject(Router)
  const $spotifyAuthClient = inject(SpotifyAuthClientService)

  const isAuthenticated = !!$spotifyAuthClient.getToken()

  if (isAuthenticated && !(route.data as any).isPrivate) {
    $router.navigateByUrl('/')
    return false
  }

  if (!isAuthenticated && (route.data as any).isPrivate) {
    $router.navigateByUrl('/login')
    return false
  }

  return true
};
