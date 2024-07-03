import path from 'node:path';
import { readFile } from 'fs/promises';
import { OAuth2Client } from 'google-auth-library';
import { env } from './env.js';
import createHttpError from 'http-errors';
import { ENV_VARS } from '../constants/constants.js';

const PATH_JSON = path.join(process.cwd(), 'google-oauth.json');

const oauthConfig = JSON.parse(await readFile(PATH_JSON));

const googleOAuthClient = new OAuth2Client({
  clientId: env(ENV_VARS.GOOGLE_AUTH_CLIENT_ID),
  clientSecret: env(ENV_VARS.GOOGLE_AUTH_CLIENT_SECRET),
  project_id: oauthConfig.web.project_id,
  redirectUri: oauthConfig.web.redirect_uris[0],
});

export const generateAuthUrl = () => {
  return googleOAuthClient.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });
};

export const validateCode = async (code) => {
  try {
    const { tokens } = await googleOAuthClient.getToken(code);

    const idToken = tokens.id_token;

    if (!idToken) throw createHttpError(401, 'Unauthorized');

    const ticket = await googleOAuthClient.verifyIdToken({
      idToken,
    });

    return ticket;
  } catch (error) {
    console.log(error);
    throw createHttpError(500, 'Error during google oauth authorization');
  }
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
