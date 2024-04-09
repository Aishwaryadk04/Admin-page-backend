const express = require('express')
const {
  signUpUser,
  signInUser,
  getUser,
  userFuntion,
  listUsers
} = require('../controllers/userController')
const {verifyUser} = require('../Middlewares/middileware')
const router = express.Router()
router.get('/', userFuntion)
router.post('/signup', signUpUser)
router.post('/signin', signInUser)
router.get('/users',listUsers)
router.route('/me').get([verifyUser], getUser)

module.exports = router