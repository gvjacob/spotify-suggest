require('dotenv').config();

import { find, get } from 'lodash';
import Spotify from 'spotify-web-api-node';

const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_ACCESS_TOKEN,
  SPOTIFY_REFRESH_TOKEN,
} = process.env;

const spotify = new Spotify({
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET,
});

spotify.setAccessToken(SPOTIFY_ACCESS_TOKEN);
spotify.setRefreshToken(SPOTIFY_REFRESH_TOKEN);

export default spotify;