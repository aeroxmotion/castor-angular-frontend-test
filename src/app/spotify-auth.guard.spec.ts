import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { spotifyAuthGuard } from './spotify-auth.guard';

describe('spotifyAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => spotifyAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
