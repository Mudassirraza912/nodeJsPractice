const express = require('express')
const router = express.Router()

const products = require('../controller/user')

// Add User into Databse
router.post('/addUser', products.addUser)

// Sign in Request
router.post('/signin', products.signin)

// Remove User by Id
router.post('/removeUser', products.removeUserById)

// Get all User from Databse
router.post('/getUser', products.getUsers)

// Get User by ID from Databse
router.post('/getUserByid', products.getUserById)

// update User 
router.post('/updateUser', products.updateUser)


module.exports = router