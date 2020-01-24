import { get, find } from 'lodash';

const IMAGE_SIZE = 300;

const isSizeCorrect = (size) => {
  return size === IMAGE_SIZE;
};

const getCorrectImage = (images) => {
  const image = find(images, ({ height }) => isSizeCorrect(height));
  return get(image, 'url');
};

export const getTrackData = (spotifyTrack) => {
  const id = get(spotifyTrack, 'id');
  const name = get(spotifyTrack, 'name');
  const artist = get(spotifyTrack, ['artists', 0, 'name']);
  const images = get(spotifyTrack, ['album', 'images']);
  const image = getCorrectImage(images);

  return { id, name, artist, image };
};

export const createSearchQuery = (query) => {
  return Object.entries(query).reduce((acc, [key, value]) => {
    return acc + ` ${key}:${value}`;
  }, '');
};
