import spotify, { withRefresh } from './_spotify';

const suggest = withRefresh(async (req, res) => {
  res.send({});
});

export default suggest;
