const mongoose      = require('mongoose')
const connection    = require('../config/database')

const userSchema    = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        max: 255
    },
    email: {
        type: String,
        require: true,
        max: 255
    },
    salt: String,   
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

module.exports = connection.model('User', userSchema) 
