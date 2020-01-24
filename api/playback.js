import { isEmpty } from 'lodash';

import spotify from './_spotify';
import { getTrackData, createSearchQuery } from './_utils';

const getRecentlyPlayed = async () => {
  return {
    name: 'Game Winner',
    artist: 'Vulfpeck',
    image: 'https://i.scdn.co/image/ab67616d00001e029ac61b549ad39e5af30e340e',
  };
};

const getPlayback = async (req, res) => {
  const { body } = await spotify.getMyCurrentPlayingTrack();

  if (isEmpty(body)) {
    const recentlyPlayed = await getRecentlyPlayed();
    return res.send(recentlyPlayed);
  }

  const trackData = getTrackData(body.item);
  res.send(trackData);
};

export default getPlayback;
