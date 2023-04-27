import { fileURLToPath } from 'url';
import { dirname } from 'path';

import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${__dirname}/../../../public/imgs/avatars`)
    },
    filename: function (req, file, cb) {
        req.body.fileName = Date.now() + '-' + file.originalname
        cb(null, req.body.fileName)
    }
});

export const uploader = multer({
    storage, onError: function (err, next) {
        next();
    }
});

export default __dirname;