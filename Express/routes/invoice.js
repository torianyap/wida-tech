const route = require('express').Router()
const routes = require('.')
const InvoiceController = require('../controller/invoice')

route.get('/', InvoiceController.readAllInvoice)
route.post('/', InvoiceController.addInvoice)
route.post('/csv', InvoiceController.addInvoiceCSV)
route.put('/:invoice_no', InvoiceController.updateInvoice)
route.delete('/:invoice_no', InvoiceController.deleteInvoice)

module.exports = route