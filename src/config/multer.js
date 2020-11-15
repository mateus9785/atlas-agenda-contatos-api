const multer = require('multer');
const crypto = require('crypto');

const dirPath = process.cwd() + '/src/public/image';

function multerConfig(path){
  const configMulter = {
    dest: dirPath + path,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, dirPath + path);
        },
        filename: (req, file, cb) => {
          crypto.randomBytes(16, (err, hash) => {
            if(err)
              cb(err);
  
            const fileName = `${hash.toString('hex')}${file.originalname.substr(file.originalname.lastIndexOf('.'))}`
            cb(null, fileName)
          })
        },
    }),
    limits: {
      fileSize: 1000000 * 90,
    },
    fileFilter: (req, file, cb) => {
      const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];
  
      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Tipo de arquivo inválido.'));
      }
    },
  };

  return configMulter;
}

module.exports = multerConfig;
