require('dotenv').config()

const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors') // sending requests from browser
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors()) // sending requests from browser
app.use(express.json()) // ability to parse json format
app.use(express.static(path.resolve(__dirname, 'static'))) // accessing static files
app.use(fileUpload({}))
app.use('/api', router)

app.use(errorHandler) // error handling, latest middleware


const start = async () => {
    try {
        await sequelize.authenticate() // db connection
        await sequelize.sync() // checks db state against db schema
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}
start()
