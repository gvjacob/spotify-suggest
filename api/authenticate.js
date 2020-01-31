import { get } from 'lodash';
import spotify from './_spotify';

const getTokens = async (req) => {
  const authorizeCode = get(req, ['query', 'code']);

  if (!authorizeCode) {
    return null;
  }

  const { body } = await spotify.authorizationCodeGrant(authorizeCode);

  return {
    accessToken: body['access_token'],
    refreshToken: body['refresh_token'],
  };
};

const getAuthorizeUrl = () => {
  const scopes = [
    'playlist-modify-public',
    'playlist-modify-public',
    'user-read-currently-playing',
  ];
  const redirectUri = 'http://www.localhost:3000/api/authenticate';

  spotify.setRedirectURI(redirectUri);

  return spotify.createAuthorizeURL(scopes);
};

const authenticate = async (req, res) => {
  const response = (await getTokens(req)) || getAuthorizeUrl();
  res.send(response);
};

export default authenticate;
