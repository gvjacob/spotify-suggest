require('dotenv').config();

const { find, get } = require('lodash');
const { getTrackData } = require('../utils');
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

const createSearchQuery = (query) => {
  return Object.entries(query).reduce((acc, [key, value]) => {
    return acc + ` ${key}:${value}`;
  }, '');
};

module.exports = (req, res) => {
  spotify.getMyCurrentPlayingTrack().then(({ body }) => {
    const trackData = getTrackData(body.item);

    res.send(trackData);
  });
};
