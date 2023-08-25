require('dotenv').config()

const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors') // sending requests from browser
const router = require('./routes/index')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors()) // sending requests from browser
app.use(express.json()) // ability to parse json format
app.use('/api', router)


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
