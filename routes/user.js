const router = require('express').Router()
const controller = require('../controllers/user')
const verifyToken = require('./verifyToken')
const passport = require('passport');

router.get('/', controller.listUsers)
router.post('/register', controller.createUser)

//router.get('/login', (req, res) => res.render('userLogin', {title:'Home'}))
//router.post('/login', controller.loginUser)
// router.post('/login', passport.authenticate('local', {
//     failureRedirect: '/login_failure', 
//     successRedirect:'/login-success'}))

router.get('/:id', controller.getUser)
router.put('/:id', controller.updateUser)
router.delete('/:id', controller.deleteUser)

module.exports = router