const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },   
    password: {
        type: String,
        required: true,
    },
    resetToken: {
        type: String
    },
    resetTokenExpiration: {
        type: Date
    }  
})

module.exports = mongoose.model("User", userSchema)

// const mongoDb = require('mongodb')
// const getDb = require('../utils/database').getDb
// class User {
//     constructor (name, email, password, id) {
//         this.name = name,
//         this.email = email,
//         this.password = password
//         this.id = id
//     }

//     createUser() {
//         const db = getDb()
//         return db.collection('user')
//         .insertOne(this)
//         .then((result) => {
//             console.log("result", result);
//         })
//         .catch(err => {
//             console.log(err)
//         })
//     }

//     getAllUser() {
//         const db = getDb()
//         return new Promise((resolve, reject) => {
//         db.collection('user').find().toArray()
//         .then((result) => {
//             if(!result) resolve({data: "Users not found!", status: false})
//             resolve({status: true, data: result})
//         })
//         .catch(err => {
//             reject({err: err})
//         })
//         })
//     }

//     getUserById(id) {
//         const db = getDb()
//         return db.collection('user').find({ _id: new mongoDb.ObjectId(id)}).next()
//         .then((result) => {
//             if(!result) return ({ status: false ,data: "User Not Found"})
//             return ({ status: true ,data: result})
//         })
//         .catch(err => {a
//             console.log(err)
//         })
//     }
// }

// module.exports = User