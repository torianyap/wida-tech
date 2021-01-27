const { Schema } = require('mongoose')

const productSchema = new Schema({
  'invoice_no': {
    type: String,
    required: [true, 'Invoice Number cannot be empty'],
    min: 1,
  },
  'item': {
    type: String,
    required: [true, 'Item Name cannot be empty'],
    minlength: [5, 'item name must be at least 5 characters']
  },
  'quantity': {
    type: Number,
    required: [true, 'Quantity cannot be empty'],
    min: [1, 'quantity must be greater than 0']
  },
  'total_cost': {
    type: Number,
    required: [true, 'Cost cannot be empty'],
    min: [0, 'cost must be greater than 0']
  },
  'total_price': {
    type: Number,
    required: [true, 'Total price is required'],
    min: [0, 'total price must be greater than 0']
  }
})

module.exports = productSchema