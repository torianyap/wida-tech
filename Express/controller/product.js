const { Product } = require('../models')

class ProductController {
  static async addProduct (req, res, next) {
    try {
      const {
        invoice_no,
        item_name,
        quantity,
        total_cost,
        total_price
      } = req.body
      
      const newProducts = await Product.create({
        invoice_no,
        item_name,
        quantity,
        total_cost,
        total_price
      })

      res.status(201).json(newProducts)

    } catch (error) {
      next(error)
    }
  }
}

module.exports = ProductController