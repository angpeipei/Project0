module.exports.logError = (error) => {
    console.log('Error has occurred.')
    console.log(error)
}

module.exports.renderResponse = (res,err,data,view,options) => {
  if (err){
    res.send(err.message)
  }
  try {
    res.render(view,{...options,data})    
  } catch (er) {
    res.send(err.message)
  }
} 

module.exports.sendResponse = (res,err,data) => {
    if (err){
      res.json({success: false, message: err})
    }
    if (!data){
      res.json({success: false, message: "Not Found"})
    } 
    res.json({success: true, data: data})
  }
