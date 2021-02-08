const express = require('express')
const router = express.Router()

const products = require('../controller/user')

// Add User into Databse
router.post('/addUser', products.addUser)

// Get all User from Databse
router.post('/getUser', products.getUsers)

// Get User by ID from Databse
router.post('/getUserByid', products.getUserById)



module.exports = router