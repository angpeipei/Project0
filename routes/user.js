const router = require('express').Router()
const controller = require('../controllers/user')
const multer = require('../config/multer')

router.get('/', controller.listUsers)
router.get('/register', (req, res) => res.render('userCreate', {title:'Register'}))
router.post('/register', multer.upload.single('file'), controller.createUser)

//router.get('/login', (req, res) => res.render('userLogin', {title:'Home'}))
//router.post('/login', controller.loginUser)
// router.post('/login', passport.authenticate('local', {
//     failureRedirect: '/login_failure', 
//     successRedirect:'/login-success'}))

router.delete('/:id', controller.deleteUser)
router.get('/:id', controller.getUser)
router.put('/:id', multer.upload.single('file'), controller.updateUser)

module.exports = router