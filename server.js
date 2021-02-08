const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const mongoConnect = require('./utils/database').mongoConnect
const router = require('./routes/api')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use('/api', router)

// 404 NOT FOUND RESPONSE
app.use((req, res, next) => {
    res.status(404).send("<h1 style='text-align: center'> Page Not Found! </h1>")
})

mongoConnect(() => {
    app.listen(3000, () => {
        console.log("Listing on 3000")
    })
})

