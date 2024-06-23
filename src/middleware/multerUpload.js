import multer from 'multer';
import { TEMPLATES_UPLOAD_DIR } from '../constants/constants.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMPLATES_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

export const upload = multer({ storage });
