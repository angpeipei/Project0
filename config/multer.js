require('dotenv').config()

const path = require('path')
const crypto = require('crypto')
const GridFsStorage = require('multer-gridfs-storage')
const multer = require('multer')

  
// Create storage engine
const storage = new GridFsStorage({
    url: process.env.DB_CONNECTION,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
  const upload = multer({ 
    storage,
    limits: {
      fileSize: 1024 * 1024 * 6
    } 
  });  

  module.exports = {
    upload
  }