import { get, isEmpty } from 'lodash';

import spotify, { withRefresh } from './_spotify';
import { createSearchQuery, getTrackData } from './_utils';

const search = withRefresh(async (req, res) => {
  const reqQuery = req.query;

  if (isEmpty(reqQuery)) {
    return res.send([]);
  }

  const query = createSearchQuery(reqQuery);
  const { body } = await spotify.searchTracks(query);
  const tracks = get(body, ['tracks', 'items']);
  const tracksData = tracks ? tracks.map(getTrackData) : [];

  res.send(tracksData);
});

export default search;
