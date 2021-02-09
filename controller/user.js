const { json } = require('body-parser')
const User = require('../models/user')

exports.addUser = (req, res, next) => {
    const { name, email, password } = req.body
    const user = new User({username: name, email: email, password: password})
    user.save()
    .then(result => {
        res.send({status: true, message:"User Created", data: result})
        res.end()
    })
    .catch(err => {
        res.status(500).send({status: false, message: err.message})
        console.log("error")
    })
}

exports.getUsers = (req, res, next) => {
    User.find()
    .then(result => {
        console.log("getUser result", result)
        res.send(result)
        res.end()
    })
    .catch(err => {
        console.log("err")
        res.send({status: false, data: err})
        res.end()
    })
}

exports.getUserById = (req, res, next) => {
    const { id } = req.body
    if (!id) res.send({status: false, message: "Id is required"}) 

    User.findById(id)
    .then(result => {
        console.log("result", result)
        res.send({status: true, data: result})
        res.end()
    })
    .catch(err => {
        console.log("err")
        res.send({status: false, data: err.message})
        res.end()
    })
}