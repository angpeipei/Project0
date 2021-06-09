
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
