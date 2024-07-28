import { FormatSpotifyArtistsPipe } from './format-spotify-artists.pipe';

describe('FormatSpotifyArtistsPipe', () => {
  it('create an instance', () => {
    const pipe = new FormatSpotifyArtistsPipe();
    expect(pipe).toBeTruthy();
  });
});
