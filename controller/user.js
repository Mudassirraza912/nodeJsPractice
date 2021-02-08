const { json } = require('body-parser')
const User = require('../models/user')

exports.addUser = (req, res, next) => {
    const { name, email, password } = req.body
    const user = new User(name, email, password)
    user.createUser(user)
    .then(result => {
        res.send("User Created")
        res.end()
    })
    .catch(err => console.log("error"))
}

exports.getUsers = (req, res, next) => {
    const { id } = req.body
    const user = new User(id)
    user.getAllUser()
    .then(result => {
        console.log("getUser result", result)
        res.send(result)
        res.end()
    })
    .catch(err => console.log("error"))
}

exports.getUserById = (req, res, next) => {
    const { id } = req.body
    const user = new User()
    user.getUserById(id)
    .then(result => {
        console.log("getUserById result", result, id)
        res.send(result)
        res.end()
    })
    .catch(err => console.log("error"))
}