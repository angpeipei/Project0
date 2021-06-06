require('dotenv').config()
const mongoose  = require('mongoose')
const conn = process.env.DB_CONNECTION
const connection = mongoose.createConnection(conn, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

module.exports = connection

