const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../Models/Usermodel')
const {sendResponseError} = require('../Middlewares/middileware')
const {checkPassword, newToken} = require('../utils/utilityFunction')

const signUpUser = async (req, res) => {
  const {password} = req.body
  try {
    const hash = await bcrypt.hash(password, 8)

    await User.create({...req.body, password: hash})
    res.status(201).send('Sucessfully account opened ')
    return
  } catch (err) {
    console.log('Eorror : ', err)
    sendResponseError(500, 'Something wrong please try again', res)
    return
  }
}

const signInUser = async (req, res) => {
  const {password, email} = req.body
  console.log(req.body)
  try {
    const user = await User.findOne({email})
    if (!!!user) {
      sendResponseError(400, 'You have to Sign up first !', res)
    }

    const same = await checkPassword(password, user.password)
    if (same) {
      let token = newToken(user)
      res.status(200).send({status: 'ok', token})
      return
    }
    sendResponseError(400, 'InValid password !', res)
  } catch (err) {
    console.log('EROR', err)
    sendResponseError(500, `Error ${err}`, res)
  }
}

const getUser = async (req, res) => {
  res.status(200).send({user: req.user})
}

const userFuntion = async(res)=>{
    console.log("Hello")
}

const listUsers = async(req,res)=>{
    try{
        const user = await User.find({})
        res.json({user})
    }
    catch(e){
        // res.status(500)
        console.log("Error",e)
    }
}

module.exports = {signUpUser, signInUser, getUser,userFuntion,listUsers}