import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { OAuth2Client } from 'google-auth-library';
import { env } from './env.js';

const PATH_JSON = path.json(process.cwd(), 'google-oauth.json');

const oauthConfig = JSON.parse(await readFile(PATH_JSON));

const googleOAuthClient = new OAuth2Client({
  clientId: env('GOOGLE_AUTH_CLIENT_ID'),
  clientSecret: env('GOOGLE_AUTH_CLIENT_SECRET'),
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
