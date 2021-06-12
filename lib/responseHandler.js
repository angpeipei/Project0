
module.exports.logError = (error) => {
    console.log('Error has occurred.')
    console.log(error)
}

module.exports.renderResponse = (req, res, err, data, view, options) => {
  if (err){
    console.log(err.message)
  }
  try {
    //const userinfo = {user:req.user, isLoggedIn:req.isAuthenticated()}
    res.render(view,{...options, data})    
  } 
  catch (err) {
    console.log(err.message)
  }
} 

module.exports.sendResponse = (req, res,err,data) => {
    if (err){
      res.json({success: false, message: err})
    }
    if (!data){
      res.json({success: false, message: "Not Found"})
    } 
    res.json({success: true, data: data})
  }

// module.exports.displayFile = (file) => {
  
//     // Check if file
//     if (!file || file.length === 0) {
//       return res.status(404).json({
//         err: 'No file exists'
//       });
//     }

//     // Check if image
//     if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
//       let gfs;
//       connection.once('open', () => {
//         // Init stream
//         gfs = Grid(connection.db, mongoose.mongo);
//         gfs.collection('uploads');
//       });

//       // Read output to browser
//       const readstream = gfs.createReadStream(file.filename);
//       readstream.pipe(res);
//     } else {
//       res.status(404).json({
//         err: 'Not an image'
//       });
//     }
// }