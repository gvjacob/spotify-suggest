require('dotenv').config();

const { find, get } = require('lodash');
const express = require('express');
const Spotify = require('spotify-web-api-node');

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

const app = express();
const port = 3000;

app.get(
  '/current-playback',
  (req, res) => {
    spotify.getMyCurrentPlayingTrack().then(({ body }) => {
      const { item } = body;
      const name = get(item, 'name');
      const artist = get(item, ['artists', '0', 'name']);
      const isPlaying = get(body, 'is_playing');
      const images = get(item, ['album', 'images']);

      res.send({ name, artist, images, isPlaying });
    });
  },
  () => res.send(null),
);

app.listen(port, () =>
  console.log(`Spotify-suggest listening on port ${port}!`),
);
