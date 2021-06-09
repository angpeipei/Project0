
module.exports.getLoginInfo = (req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    if (req.user){
        res.locals.userId = req.user._id.toString()
        res.locals.userName = req.user.name
        res.locals.isAdmin = req.user.isAdmin
    }
    else {
        res.locals.userId = ''
        res.locals.userName = ''
        res.locals.isAdmin = false
    }
    next();
}

module.exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/login')
    //res.status(401).json({message:'You are not autnorized'})
}

module.exports.isLoggedOut = (req, res, next) => {
    if (!req.isAuthenticated()){
        return next();
    }
    res.redirect('/')
}

module.exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.isAdmin) {
        next()
    }
    res.status(401).json({message:'You are not autnorized as you are not an admin'})
}