import { isEmpty } from 'lodash';

import spotify, { withRefresh } from './_spotify';
import { getTrackData } from './_utils';

const getRecentlyPlayed = async () => {
  return {
    name: 'Game Winner',
    artist: 'Vulfpeck',
    image: 'https://i.scdn.co/image/ab67616d00001e029ac61b549ad39e5af30e340e',
  };
};

const getPlayback = withRefresh(async (req, res) => {
  try {
    const { body } = await spotify.getMyCurrentPlayingTrack();

    if (isEmpty(body)) {
      res.send(getRecentlyPlayed());
    } else {
      const trackData = getTrackData(body.item);
      res.send(trackData);
    }
  } catch {
    res.send(getRecentlyPlayed());
  }
});

export default getPlayback;
