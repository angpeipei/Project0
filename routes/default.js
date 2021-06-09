const router = require('express').Router()
const responseHandler = require('../lib/responseHandler.js')
const passport      = require('passport')

router.get('/', (req, res) => responseHandler.renderResponse('index', {title:'Home'}))
router.get('/login', (req, res) => res.render('userLogin', {title:'Home'}))
router.post('/login', passport.authenticate('local', {failureRedirect: '/login_failure', successRedirect:'/'}))
router.get('/login_failure', (req,res)=> res.send('login failed'))
router.get('/login_success', (req,res)=> res.send('login success'))

router.get('/logout', (req,res)=> {
    req.logout()
    res.send('logout success')
})
module.exports = router