import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { OAuth2Client } from 'google-auth-library';
import { env } from './env.js';
import createHttpError from 'http-errors';
import { ENV_VARS } from '../constants/constants.js';

const PATH_JSON = path.json(process.cwd(), 'google-oauth.json');

const oauthConfig = JSON.parse(await readFile(PATH_JSON));

const googleOAuthClient = new OAuth2Client({
  clientId: env(ENV_VARS.GOOGLE_AUTH_CLIENT_ID),
  clientSecret: env(ENV_VARS.GOOGLE_AUTH_CLIENT_SECRET),
  redirectUri: oauthConfig.web.redirect_uris[0],
});
export const generateAuthUrl = () => {
  googleOAuthClient.generateAuthUrl({
    access_type: 'offline',
    scope: [
      '<https://www.googleapis.com/auth/userinfo.email>',
      '<https://www.googleapis.com/auth/userinfo.profile>',
    ],
  });
};

export const validateCode = async (code) => {
  const respons = await googleOAuthClient.getToken(code);

  if (!respons.tokens.id_token) throw createHttpError(401, 'Unauthorized');

  const ticket = await googleOAuthClient.verifyIdToken({
    idToken: respons.tokens.id_token,
  });

  return ticket;
};

export const getFullNameFromGoogleTokenPayload = (payload) => {
  let name = 'Guest';

  if (payload.given_name && payload.family_name) {
    name = `${payload.given_name} ${payload.family_name}`;
  } else if (payload.given_name) {
    name = payload.given_name;
  }

  return name;
};
