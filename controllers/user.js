
const userModel = require('../models/user')
const responseHandler = require('../lib/responseHandler.js')
const passwordHandler = require('../lib/passwordUtils.js')
const passport = require('passport')
const { response } = require('express')

const listUsers = async (req, res) => {
    try {
        await userModel.find((err, data) => {
            //responseHandler.sendResponse(req, res,err,data)
            responseHandler.renderResponse(req, res,err,data,'userList',{title:'User List'})
        })        
    } catch (err) {
        console.log (err.message)
    }
}

const getUser = async (req, res) => {
    userModel.findById(req.params.id, 
        (err, data) => {
        //responseHandler.sendResponse(req, res,err,data)
        responseHandler.renderResponse(req, res,err, data, 'userEdit',{title:'Update user'})
    })
}

const createUser = async (req, res) => {
    const emailExisted = await userModel.findOne({email:req.body.email})
    if (emailExisted) {return res.status(400).send('Email already existed')}
    const hashPassword = await passwordHandler.hashPassword(req.body.password)
    
    const newData = {
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        isAdmin: (req.body.isAdmin?true:false)
    }
    if (req.file){
        newData.photoFilename = req.file.filename
    }
    console.log(newData)
    userModel.create(
        newData,
        (err, data) => {
            if (req.isAuthenticated())
                res.redirect('/users')
            else
                res.redirect('/login')
            //responseHandler.sendResponse(req, res,err,data)
        }
    )
}

const updateUser = async (req, res) => {
    if (! res.locals.isAdmin) {
        if ( res.locals.userId !== req.params.id)
            {return res.status(401).send('Access denied. You can only update your own record')}
    }
    
    const newData = {
        name: req.body.name,
        email: req.body.email
    }
    if (req.file){
        newData.photoFilename = req.file.filename
    }
    if ( res.locals.userId !== req.params.id){
        newData.isAdmin = (req.body.isAdmin?true:false)
    }
    userModel.findByIdAndUpdate(req.params.id, 
        newData, 
        {new: true},
        (err, data) => {
            //responseHandler.sendResponse(req, res,err,data)
            res.redirect('/users')
        })
}

const deleteUser = async (req, res) => {
   // if (!req.user.__isAdmin) {return res.status(401).send('Access denied. Only administrator is allowed to delete')}
    userModel.findByIdAndRemove(req.params.id,
        (err, data) => 
        {
            //res.json(`User ${req.params.id} has been deleted`)
            //responseHandler.sendResponse(req, res,err,data)
            res.redirect('/users')
        }
    )
}

module.exports = {
    listUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}