const routes = require('express').Router()
const invoice_route = require('./invoice')
const product_route = require('./product')

routes.use('/invoice', invoice_route)
routes.use('/products', product_route)

module.exports = routes