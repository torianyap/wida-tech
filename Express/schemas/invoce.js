const { Schema } = require('mongoose')

const invoiceSchema = new Schema({
  'invoice_no': {
    type: String,
    required: [true, 'Invoice Number cannot be empty'],
    min: 1,
    unique: [true, 'invoice number cannot be a duplicate']
  },
  'date': {
    type: Date,
    required: [true, 'Invoice Date cannot be empty']
  },
  'customer': {
    type: String,
    required: [true, 'Customer Name cannot be empty'],
    minlength: [2, 'Customer Name must be at least 2 characters']
  },
  'salesperson': {
    type: String,
    required: [true, 'Salesperson Name cannot be empty'],
    minlength: [2, 'Salesperson Name must be at least 2 characters']
  },
  'payment_type': {
    type: String,
    enum: ['CASH', 'CREDIT'],
    required: [true, 'Payment type cannot be empty']
  },
  'notes': {
    type: String,
    required: false,
    minlength: [5, 'notes must be a minimal of 5 characters']
  },
  'products_sold': [{
    type: Schema.Types.ObjectId,
    ref: 'Products'
  }]
}, {
  timestamps: true
})

module.exports = invoiceSchema