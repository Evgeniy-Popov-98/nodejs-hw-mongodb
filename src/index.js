import { initMongoConnection } from './db/initMongoConnection';
import { setupServer } from './server';

(async () => {
  await initMongoConnection();
  setupServer();
})();
