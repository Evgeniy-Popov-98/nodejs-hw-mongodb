import { TEMPLATES_UPLOAD_DIR, UPLOAD_DIR } from './constants/constants.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';

(async () => {
  await initMongoConnection();
  await createDirIfNotExists(TEMPLATES_UPLOAD_DIR);
  await createDirIfNotExists(UPLOAD_DIR);
  setupServer();
})();
