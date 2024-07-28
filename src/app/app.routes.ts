import { type Route, type Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { spotifyAuthGuard } from './spotify-auth.guard';
import { LoginComponent } from './login/login.component';
import { TrackDetailComponent } from './track-detail/track-detail.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';

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
  }
];

function defineAuthRoute(isPrivate: boolean): Partial<Route> {
  return {
    data: { isPrivate },
    canActivate: [spotifyAuthGuard],
  }
}
