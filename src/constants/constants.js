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

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};

export const JWT_SECRET = 'JWT_SECRET';

export const APP_DOMAIN = 'APP_DOMAIN';
export const APP_DOMAIN_PHOTO = 'APP_DOMAIN_PHOTO';

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');

export const TEMPLATES_UPLOAD_DIR = path.join(process.cwd(), 'temp');

export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  API_KEY: 'API_KEY',
  API_SECRET: 'API_SECRET',
  ENABLE_CLOUDINARY: 'ENABLE_CLOUDINARY',
};

export const SWAGGER_PATH = path.json(process.cwd(), 'docs', 'swagger.json');
