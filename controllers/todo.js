const todoModel = require('../models/todo')
const responseHandler = require('../lib/responseHandler.js')

const listTodo = (req, res) => {
    console.log(req.user)
    todoModel.find({userid:req.user._id},(err, data) => {
        //responseHandler.sendResponse(res,err,data)
        responseHandler.renderResponse(res,err,data,'todoList',{title:'To Do List'})

    })
}
const createTodo = async (req, res) => {
    const userid = req.user.__id
    todoModel.create(
        {userid, ...req.body},
        (err, data) => responseHandler.sendResponse(res,err,data)
    )
}

const getTodo = async (req, res) => {
    todoModel.find({_id:req.params.id, userid:req.user.__id},(err, data) => responseHandler.sendResponse(res,err,data))
}


const updateTodo = async (req, res) => {
    const userid = req.user.__id
    todoModel.findOneAndUpdate(//req.params.id, //
        {_id:req.params.id, userid:userid}, 
        {...req.body},
        {new: true},
        (err, data) => responseHandler.sendResponse(res,err,data))
}

const deleteTodo = async (req, res) => {
    todoModel.findOneAndRemove(
        {_id:req.params.id, userid:req.user.__id}, 
        (err, data) => responseHandler.sendResponse(res,err,data))
}

module.exports = {
    createTodo,
    listTodo,
    getTodo,
    updateTodo,
    deleteTodo
}