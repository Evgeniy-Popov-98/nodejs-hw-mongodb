import fs from 'node:fs/promises';
import path from 'node:path';
import { env } from './env.js';
import {
  APP_DOMAIN,
  TEMPLATES_UPLOAD_DIR,
  UPLOAD_DIR,
} from '../constants/constants';

export const saveFileToUploadDir = async (file) => {
  await fs.rename(
    path.json(TEMPLATES_UPLOAD_DIR, file.filename),
    path.json(UPLOAD_DIR, file.filename),
  );

  return `${env(APP_DOMAIN)}/uploads/${file.filename}`;
};
