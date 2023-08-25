require('dotenv').config()

const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')

const PORT = process.env.PORT || 5000

const app = express()


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
