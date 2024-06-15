import path from 'node:path';

export const PATH_DB = path.join('src', 'db', 'db.json');

export const ENV_VARS = {
  PORT: 'PORT',
  MONGODB_USER: 'MONGODB_USER',
  MONGODB_PASSWORD: 'MONGODB_PASSWORD',
  MONGODB_URL: 'MONGODB_URL',
  MONGODB_DB: 'MONGODB_DB',
};

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const ACCESS_TOKEN_LIFE_TIME = 15 * 60 * 1000;

export const REFRESH_TOKEN_LIFE_TIME = 30 * 24 * 60 * 60 * 1000;
