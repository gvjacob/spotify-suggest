import { isEmpty, get } from 'lodash';

import spotify, { withRefresh } from './_spotify';
import { getTrackData } from './_utils';

const DEFAULT_TRACK = {
  name: "California Dreamin'",
  artist: 'José Feliciano',
  image: 'https://i.scdn.co/image/ab67616d00001e025f0a59daa1b8f11bfbfe94f3',
  isPlaying: false,
};

const getRecentlyPlayed = async () => {
  const { body } = await spotify.getMyRecentlyPlayedTracks({
    type: 'track',
    limit: 1,
  });

  const recentlyPlayed = get(body, ['items', 0, 'track']);
  return recentlyPlayed ? getTrackData(recentlyPlayed, false) : DEFAULT_TRACK;
};

const getPlayback = withRefresh(async (req, res) => {
  try {
    const { body } = await spotify.getMyCurrentPlayingTrack();

    if (isEmpty(body)) {
      res.send(await getRecentlyPlayed());
    } else {
      const trackData = getTrackData(body.item, true);
      res.send(trackData);
    }
  } catch {
    res.send(await getRecentlyPlayed());
  }
});

export default getPlayback;
