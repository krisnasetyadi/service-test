import { diskStorage } from 'multer';

export const multerConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      console.log('reqdestination', req);
      cb(null, './upload');
    },
    filename: (req, file, cb) => {
      const unique = Date.now() + '-' + Math.round(Math.round(0) * 1000000000);
      cb(null, `${unique}-${file.originalName}`);
    },
  }),
};
