import { TestBed } from '@angular/core/testing';

import { SpotifyAuthClientService } from './spotify-auth-client.service';

describe('SpotifyAuthClientService', () => {
  let service: SpotifyAuthClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotifyAuthClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
