const { json } = require('body-parser')
const User = require('../models/user')
const bcrypt = require('bcryptjs');
var validate = require("validate.js");


// SIGNUP
exports.addUser = (req, res, next) => {
    const { name, email, password, phone } = req.body
    var constraints = {
        name: {
            presence: true,
            length: {
                minimum: 6,
                message: "must be at least 6 characters"
            }
        },
        email: {
            presence: true,
            email: true
        },
        phone: {
            presence: true,
            length: {
                minimum: 11,
                message: "must be at least 11 characters"
              }
        },
        password: {
            presence: true,
            length: {
              minimum: 6,
              message: "must be at least 6 characters"
            }
        }
    }
    const isValidate = validate(req.body, constraints)
    if(isValidate) return res.status(403).send({status: false, message: isValidate})
    User.findOne({email: email})
    .then((userObj) => {
        if(userObj) return res.status(200).send({status: false, message: "User already exist"})
        bcrypt.hash(password, 12)
        .then((hashedPassword) => {
            const user = new User({username: name, email: email, password: hashedPassword, phone: phone})
            user.save()
            .then((userDoc) => {
                return res.status(200).send({status: true, message: "User Created Succesfully!", data: userDoc})
            })
        })
    })
}

// SIGN IN
exports.signin = (req, res, next) => {
    const { email, password } = req.body 
    if(!email || !password ) {
        return res.status(403).send({status: false, message: "Email & Password both are required"})
    }else {
        User.findOne({email: email})
        .then((userDoc) => {
            if(userDoc) {
                bcrypt.compare(password, userDoc.password)
                .then((isMatched) => {
                    if(isMatched) {
                        return res.status(200).send({status: true, data: userDoc, message: "Sign in Sucessfully"})
                    }else {
                        return res.status(403).send({status: false, message: "Email or Password is incorrect"})
                    }
                })
            }else {
                return res.status(403).send({status: false, message: "Email or Password is incorrect"})
            }

        })
        .catch(err => {
            return res.status(403).send({status: false, message: err.message})
        })
    }
}

// GET ALL USERS
exports.getUsers = (req, res, next) => {
    User.find()
    .then(result => {
        console.log("getUser result", result)
        res.status(200).send({status: true, data: result})
        res.end()
    })
    .catch(err => {
        console.log("err")
        res.status(403).send({status: false, data: err.message})
        res.end()
    })
}

// GET USER BY ID
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

// Remove User By Id
exports.removeUserById = (req, res, next) => {
    const { id } = req.body
    if (!id) res.send({status: false, message: "Id is required"}) 

    User.findByIdAndRemove(id)
    .then(result => {
        console.log("result removeUserById", result)
        if(!result) return res.send({status: false, message: "User not found!"})
        return res.send({status: true, message: "User Deleted!"})
    })
    .catch(err => {
        console.log("err removeUserById")
        res.send({status: false, data: err.message})
        res.end()
    })
}

// Update User Controller
exports.updateUser = (req, res, next) => {
    const { id, phone } = req.body
    if (!id) res.send({status: false, message: "Id is required"}) 
    if (phone && phone.length < 11) res.send({status: false, message: "phone must be at least 11 characters"}) 


    User.findByIdAndUpdate(id, req.body)
    .then(result => {
        console.log("result updateUser", result)
        if(!result) return res.send({status: false, message: "User not found!"})
        return res.send({status: true, message: "User Updated Sucessfully!"})
    })
    .catch(err => {
        console.log("err updateUser")
        res.send({status: false, data: err.message})
        res.end()
    })
}