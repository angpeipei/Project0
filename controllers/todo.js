const todoModel = require('../models/todo')
const responseHandler = require('../lib/responseHandler.js')

const listTodo = (req, res) => {
    todoModel.find({userid:req.user._id},(err, data) => {
        //responseHandler.sendResponse(req, req, res,err,data)
        responseHandler.renderResponse(req, res,err,data,'todoList',{title:'To Do List'})

    })
}
const createTodo = async (req, res) => {
    const userid = res.locals.userId
    console.log(req.body)
    req.body.isCompleted = (req.body.isCompleted?true:false)
    todoModel.create(
        {userid, ...req.body},
        (err, data) => {
            res.redirect('/todo')
            //responseHandler.sendResponse(req, res,err,data)
        }
    )
}

const getTodo = async (req, res) => {
    todoModel.find({_id:req.params.id, userid:res.locals.userId},(err, data) => {
        console.log(data)
        responseHandler.renderResponse(req, res, err, data, 'todoEdit',{title:'Update todo / notes'})
        //responseHandler.sendResponse(req, res,err,data)
    })
}


const updateTodo = async (req, res) => {
    const userid = res.locals.userId
    req.body.isCompleted = (req.body.isCompleted?true:false)
    console.log(req.body)
    
    todoModel.findOneAndUpdate(//req.params.id, //
        {_id:req.params.id, userid:userid}, 
        {...req.body},
        {new: true},
        (err, data) => 
        {
            console.log(data)
            res.json(`Todo ${req.params.id} has been updated`)
            //responseHandler.sendResponse(req, res,err,data))
    })
}

const deleteTodo = async (req, res) => {
    todoModel.findOneAndRemove(
        {_id:req.params.id, userid:res.locals.userId}, 
        (err, data) => {
            res.json(`Todo ${req.params.id} has been deleted`)
            //responseHandler.sendResponse(req, res,err,data)
    })
}

module.exports = {
    createTodo,
    listTodo,
    getTodo,
    updateTodo,
    deleteTodo
}