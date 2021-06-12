// const assert = require('assert');
// const fs = require('fs');
// const mongodb   = require('mongodb ')
// const connection = require('../config/database')

// const bucket = new mongodb.GridFSBucket(connection.db, {
//     chunkSizeBytes: 1024,
//     bucketName: 'songs'
//   });
  
//   fs.createReadStream('./meistersinger.mp3').
//     pipe(bucket.openUploadStream('meistersinger.mp3')).
//     on('error', function(error) {
//       assert.ifError(error);
//     }).
//     on('finish', function() {
//       console.log('done!');
//       process.exit(0);
//     });