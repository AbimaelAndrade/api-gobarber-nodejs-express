import multer from 'multer';
import File from '../models/File';

import multerConfig from '../../config/multer';

const upload = multer(multerConfig).single('file');

class FileController {
  async store(req, res) {
    upload(req, res, async err => {
      if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(500).json({
          error: {
            message: 'Arquivo muito grande',
            code: 'LIMIT_FILE_SIZE',
          },
        });
      }

      try {
        const { originalname: name, filename: path } = req.file;

        const file = await File.create({
          name,
          path,
        });

        return res.json(file);
      } catch (error) {
        return res.status(500).json({
          error: {
            message: 'O arquivo não pode ser salvo.',
            code: 'CREATE_FILE',
          },
        });
      }
    });
  }
}

export default new FileController();
