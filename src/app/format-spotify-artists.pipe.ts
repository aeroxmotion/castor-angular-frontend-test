import { Pipe, PipeTransform } from '@angular/core';

import { type SpotifyArtist } from './spotify-client.service';

@Pipe({
  name: 'formatSpotifyArtists',
  standalone: true
})
export class FormatSpotifyArtistsPipe implements PipeTransform {

  transform(artists: SpotifyArtist[], ..._: unknown[]) {
    return artists.map(artist => artist.name).join(', ')
  }

}
