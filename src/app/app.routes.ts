import { type Route, type Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { spotifyAuthGuard } from './spotify-auth.guard';
import { LoginComponent } from './login/login.component';
import { TrackDetailComponent } from './track-detail/track-detail.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    ...defineAuthRoute(true),
  },
  {
    path: 'login',
    component: LoginComponent,
    ...defineAuthRoute(false),
  },
  {
    path: 'auth-callback',
    component: AuthCallbackComponent,
    ...defineAuthRoute(false),
  },
  {
    path: 'track/:id',
    component: TrackDetailComponent,
    ...defineAuthRoute(true),
  },
  {
    path: 'artist/:id',
    component: ArtistDetailComponent,
    ...defineAuthRoute(true),
  },
  {
    path: 'album/:id',
    component: AlbumDetailComponent,
    ...defineAuthRoute(true),
  },
];

function defineAuthRoute(isPrivate: boolean): Partial<Route> {
  return {
    data: { isPrivate },
    canActivate: [spotifyAuthGuard],
  }
}
