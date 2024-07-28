import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { spotifyAuthGuard } from './spotify-auth.guard';
import { LoginComponent } from './login/login.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { isPrivate: true },
    canActivate: [spotifyAuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { isPrivate: false },
    canActivate: [spotifyAuthGuard],
  },
  {
    path: 'auth-callback',
    data: { isPrivate: false },
    component: AuthCallbackComponent,
    canActivate: [spotifyAuthGuard],
  },
];
