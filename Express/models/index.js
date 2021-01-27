const { model } = require('mongoose')
const invoiceSchema = require('../schemas/invoce')
const productSchema = require('../schemas/product')

const Invoice = model('Invoices', invoiceSchema)
const Product = model('Products', productSchema)

module.exports= {
  Invoice,
  Product
}