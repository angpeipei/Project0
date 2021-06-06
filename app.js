require('dotenv').config()

const path          = require('path')
const express       = require('express')

const session       = require('express-session')
const passport      = require('passport')
const ejs           = require('ejs')
const ejslayout     = require('express-ejs-layouts')


const resHandler    = require('./lib/responseHandler')
const Auth          = require('./routes/authMiddleware')
const userRoute     = require('./routes/user')
const todoRoute     = require('./routes/todo')



// const mongoose      = require('mongoose')
// const connection    = require('./config/database')
// const MongoStore    = require('connect-mongo')
// const sessionStore = new MongoStore({ mongooseConnection:connection, collection:'sessions'})

// const connection = mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
// .then (console.log('Connected to DB'))
// .catch (error => errorHandler.logError(`Error in DB connection : ${error}`))
// mongoose.connection.on('error', err => errorHandler.logError('err'))

//Middleware
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true
    // ,store: sessionStore,
    // cookie:{
    //     maxAge:1000 * 60 * 60 * 24 
    // }
}))

require('./config/passport')
app.use(passport.initialize())
app.use(passport.session())

app.use(ejslayout)
app.set('views', path.join(__dirname, 'views'))
app.set('layout', path.join(__dirname, 'views/layouts/default'))
app.set('view engine', 'ejs')

//Routes
app.get('/', (req, res) => res.render('index', {title:'Home'}))
app.get('/login', (req, res) => res.render('userLogin', {title:'Home'}))

app.post('/login', passport.authenticate('local', {failureRedirect: '/login_failure', successRedirect:'/'}))
app.get('/login_failure', (req,res)=> res.send('login failed'))
app.get('/login_success', (req,res)=> res.send('login success'))

app.get('/logout', (req,res)=> {
    req.logout()
    res.send('logout success')
})

app.use('/users', userRoute)
app.use('/todo', Auth.isLoggedIn, todoRoute)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening to port ${port}`))