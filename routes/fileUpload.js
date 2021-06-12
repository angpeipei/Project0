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
  console.log(req.params.filename)

  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.redirect('/image/noImage.png')
        //res.status(404).json({
        //err: 'No file exists'
        //})
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    }
  });
});

// router.get('/', (req, res) => {
//     console.log(gfs)
//   gfs.files.find().toArray((err, files) => {
//     // Check if files
//     if (!files || files.length === 0) {
//       res.render('index', { files: false });
//     } else {
//       files.map(file => {
//         if (
//           file.contentType === 'image/jpeg' ||
//           file.contentType === 'image/png'
//         ) {
//           file.isImage = true;
//         } else {
//           file.isImage = false;
//         }
//       });
//       res.render('index', { files: files});
//     }
//     });
// });



// // @route GET /image/:filename
// // @desc Display Image
// router.get('/image/:filename', (req, res) => {
//   gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//     // Check if file
//     if (!file || file.length === 0) {
//       return res.status(404).json({
//         err: 'No file exists'
//       });
//     }

//     // Check if image
//     if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
//       // Read output to browser
//       const readstream = gfs.createReadStream(file.filename);
//       readstream.pipe(res);
//     } else {
//       res.status(404).json({
//         err: 'Not an image'
//       });
//     }
//   });
// });


module.exports = router 