import multer from 'multer';
import { extname, resolve } from 'path';
import crypto from 'crypto';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (error, res) => {
        if (error) return cb(error);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
  limits: {
    fileSize: process.env.FILE_SIZE_AVATAR || 2097152,
  },
};
