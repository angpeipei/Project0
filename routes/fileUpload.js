require('dotenv').config()
const router = require('express').Router()
const controller = require('../controllers/fileUpload')
const multer = require('../config/multer')

const mongoose  = require('mongoose')
const connection = require('../config/database')
const Grid = require('gridfs-stream')

const MIME_TYPES = {
  'imgs/jpg': 'jpg',
  'imgs/jpeg': 'jpeg',
  'imgs/png': 'png'
}

// Init gfs
let gfs;
connection.once('open', () => {
  // Init stream
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection('uploads');
});

router.post('/', multer.upload.single('file'), (req, res) => {
    res.json({ file: req.file });
});

router.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.redirect('/image/noImage.png')
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    }
    else {
      return res.redirect('/image/noImage.png')
    }
  })
})

router.delete('/delete/:filename', (req, res) => {

  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {

    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json(`File not found`)
    }
  console.log(file._id)      
      gfs.remove({ _id: file._id, root: 'uploads' }, (err, gridStore) => {
        if (err) {
          return res.status(404).json({ err: err });
        }
          res.json(`File ${req.params.id} has been deleted`)
      })

    
  })


});



module.exports = router 