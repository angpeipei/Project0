const router = require('express').Router()
const controller = require('../controllers/user')
const verifyToken = require('./verifyToken')
const passport = require('passport');

router.get('/', controller.listUsers)
router.get('/register', (req, res) => res.render('userCreate', {title:'Register'}))
router.post('/register', controller.createUser)

//router.get('/login', (req, res) => res.render('userLogin', {title:'Home'}))
//router.post('/login', controller.loginUser)
// router.post('/login', passport.authenticate('local', {
//     failureRedirect: '/login_failure', 
//     successRedirect:'/login-success'}))

router.delete('/:id', controller.deleteUser)
router.get('/:id', controller.getUser)
router.put('/:id', controller.updateUser)

module.exports = router