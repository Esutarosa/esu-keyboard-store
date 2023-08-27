const uuid = require('uuid') // generate random id
const path = require('path')
const { Item } = require('../models/models')
const ApiError = require('../error/ApiError')

class ItemController {
    async create(req, res, next) {

        try {
            const { name, price, brandId, typeId, info } = req.body // type name extraction
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName)) // moving a file to a given folder
    
            const item = await Item.create({ name, price, brandId, typeId, info, img: fileName })
            return res.json(item)
        } catch (e) {
            next(ApiError.badRequest(e.message))
            console.log(e);
        }
        
    }

    async getAll(req, res) {

    }

    async getOne(req, res) {

    }
}

module.exports = new ItemController()