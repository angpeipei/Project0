module.exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()){
        return next();
    }
    res.status(401).json({message:'You are not autnorized'})
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