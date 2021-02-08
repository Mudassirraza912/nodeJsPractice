const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
const router = require('./routes/api')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use('/api', router)

// 404 NOT FOUND RESPONSE
app.use((req, res, next) => {
    res.status(404).send("<h1 style='text-align: center'> Page Not Found! </h1>")
})

mongoose.connect('mongodb+srv://mudassirraza912:Mams9990!@cluster0.ywq4h.mongodb.net/Cluster0?retryWrites=true&w=majority')
.then((result) => {
    app.listen(3000, () => {
        console.log("Listing on 3000")
    })
})
.catch((err) => console.log("err err", err))

