const route = require('express').Router()
const ProductController = require('../controller/product')

route.post('/', ProductController.addProduct)

module.exports = route