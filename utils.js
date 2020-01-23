const { get } = require('lodash');

const isString = (value) => typeof value === 'string';
const isArray = (value) => Array.isArray(value);

/**
 * Safe get values from given object and return
 * a mapping from each attribute to value.
 *
 * @param {object} from the object to grab values from
 * @param {string[]|array[]} attributes the values to grab
 */
const safeGet = (from, ...attributes) => {
  const result = attributes.reduce((acc, attr) => {
    if (isArray(attr) && attr.length > 0) {
      const lastAttr = attr[attr.length - 1];
      acc[lastAttr] = get(from, attr);
    } else if (isString(attr)) {
      acc[attr] = get(from, attr);
    }

    return acc;
  }, {});

  return result;
};

const getTrackData = (spotifyTrack) => {
  const name = get(spotifyTrack, 'name');
  const artist = get(spotifyTrack, ['artists', 0, 'name']);
  const images = get(spotifyTrack, ['album', 'images']);

  return { name, artist, images };
};

module.exports = { getTrackData };
