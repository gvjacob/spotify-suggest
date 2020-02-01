import { isEmpty, get } from 'lodash';

import spotify, { withRefresh } from './_spotify';
import { getTrackData } from './_utils';

const getRecentlyPlayed = async () => {
  const { body } = await spotify.getMyRecentlyPlayedTracks({
    type: 'track',
    limit: 1,
  });

  const recentlyPlayed = get(body, ['items', 0, 'track']);
  return getTrackData(recentlyPlayed);
};

const getPlayback = withRefresh(async (req, res) => {
  try {
    const { body } = await spotify.getMyCurrentPlayingTrack();

    if (isEmpty(body)) {
      res.send(await getRecentlyPlayed());
    } else {
      const trackData = getTrackData(body.item);
      res.send(trackData);
    }
  } catch {
    res.send(await getRecentlyPlayed());
  }
});

export default getPlayback;
