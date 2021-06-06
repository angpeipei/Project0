const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user')
const responseHandler = require('../lib/responseHandler.js')
const passwordHandler = require('../lib/passwordUtils.js')
const passport = require('passport')

const listUsers = async (req, res) => {
    try {
        await userModel.find((err, data) => {
            //responseHandler.sendResponse(res,err,data)
            responseHandler.renderResponse(res,err,data,'userList',{title:'User List'})
        })        
    } catch (err) {
        console.log (err.message)
    }
}

const getUser = async (req, res) => {
    userModel.findById(req.params.id, 
        (err, data) => responseHandler.sendResponse(res,err,data))
}

const createUser = async (req, res) => {
    const emailExisted = await userModel.findOne({email:req.body.email})
    if (emailExisted) {return res.status(400).send('Email already existed')}
    const hashPassword = await passwordHandler.hashPassword(req.body.password)

    userModel.create(
        {
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        },
        (err, data) => responseHandler.sendResponse(res,err,data)
    )
}

const updateUser = async (req, res) => {
    if (!req.user.__isAdmin) {
        if (req.user.__id !== req.params.id)
            {return res.status(401).send('Access denied. You can only update your own record')}
    }
    const hashPassword = await passwordHandler.hashPassword(req.body.password)
    userModel.findByIdAndUpdate(req.params.id, 
        {
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        },
        {new: true},
        (err, data) => responseHandler.sendResponse(res,err,data))
}

const deleteUser = async (req, res) => {
    if (!req.user.__isAdmin) {return res.status(401).send('Access denied. Only administrator is allowed to delete')}
    userModel.findByIdAndRemove(req.params.id,
        (err, data) => responseHandler.sendResponse(res,err,data))
}

module.exports = {
    listUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}