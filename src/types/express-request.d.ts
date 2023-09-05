// src/types/express-request.d.ts
import { MulterFile } from 'multer';

declare global {
  namespace Express {
    interface Request {
      file: MulterFile;
    }
  }
}
