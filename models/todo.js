const mongoose      = require('mongoose')
const connection    = require('../config/database')
const todoSchema    = new mongoose.Schema({
    userid : {
        type:String,
        require:true
    },
    title : {
        type:String,
        require:true,
        max:255
    },
    Category : {
        type:String,
        max:255
    },
    Description : {
        type:String
    },
    startDate : {
        type:Date
    },
    dueDate : {
        type: Date
    },
    isCompleted : {
        type: Boolean,
        default: false
    },
    timestamp : {
        type:Date
    }
})

module.exports = connection.model('ToDo', todoSchema)