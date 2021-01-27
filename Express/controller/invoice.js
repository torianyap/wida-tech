const { Invoice, Product } = require('../models')
const excelToJSON = require('convert-excel-to-json')
const { translateExcelData } = require('../helpers')

class InvoiceController {
  static async addInvoice (req, res, next) {
    try {
      const {
        invoice_no,
        date,
        customer,
        salesperson,
        payment_type,
        notes,
      } = req.body

      const products_sold = await Product.find({
        'invoice_no': invoice_no
      }).exec()

      const newInvoice = await Invoice.create({
        invoice_no,
        date: new Date(date),
        customer,
        salesperson,
        payment_type,
        notes,
        products_sold: products_sold.map(product => product._id)
      })

      res.status(201).json(newInvoice)

    } catch (error) {
      next(error)
    }
  }

  static addInvoiceCSV (req, res, next) {
    const { invoice } = req.files
    let filename = invoice.name

    invoice.mv(`./excel/${filename}`, (err) => {
      if (err) {
        next({ status: 400, message: 'File upload failed' })
      } else {
        let parsedData = excelToJSON({
          sourceFile: `./excel/${filename}`,
          header: { rows: 1 },
          columnToKey: {
            '*': "{{columnHeader}}"
          }
        })
        let { invoice_data, product_data } = translateExcelData(parsedData)
        let valid_invoice_no = invoice_data.map(el => el.invoice_no)
        product_data.forEach(prod => {
          if (!valid_invoice_no.includes(prod.invoice_no)) {
            next({ status: 400, message: `There is an invalid invoice number in the products data => ${prod.invoice_no}` })
          }
        })
        Product.create(product_data)
          .then(prod_res => {
            invoice_data.forEach(data => {
              data.products_sold = prod_res.filter(prod => prod.invoice_no === data.invoice_no)
            })
            return Invoice.create(invoice_data)
          })
          .then((final_res) => {
            if (final_res.length > 0) {
              res.status(201).json(final_res)
            }
          })
          .catch(err => next(err))
      }
    })
  }

  static async readAllInvoice (req, res, next) {
    try {
      const filter = req.query
      const allInvoice = await Invoice.find(filter)
        .populate('products_sold', 'item quantity total_cost total_price')
      
      let profit = 0
      let total_cash_transacton = 0

      allInvoice.forEach(invoice => {
        if (invoice.payment_type === 'CASH') {
          total_cash_transacton += 1
        }
        invoice.products_sold.forEach(product => {
          profit += product.total_price - product.total_cost
        })
      })

      const results = {
        invoices: allInvoice,
        profit: new Intl.NumberFormat('id', { style: 'currency', 'currency': 'IDR' }).format(profit),
        total_cash_transacton,
      }

      res.status(200).json(results)
    } catch (error) {
      next(error)
    }
  }

  static async updateInvoice (req, res, next) {
    try {
      const { invoice_no } = req.params
      const {
        date,
        customer,
        salesperson,
        payment_type,
        notes,
      } = req.body

      const updated = await Invoice.updateOne({
        invoice_no
      }, { date, customer, salesperson, payment_type, notes })

      if (updated.nModified) {
        res.status(200).json({ message: `Invoice ${invoice_no} has been updated` })
      } else {
        throw { message: `Invoice ${invoice_no} cannot be found`, status: 404 }
      }

    } catch (error) {
      next(error)
    }
  }

  static async deleteInvoice (req, res, next) {
    try {
      const { invoice_no } = req.params
      const { deletedCount } = await Invoice.deleteMany({
        'invoice_no': invoice_no
      })
      const { deletedCount: product_deleted } = await Product.deleteMany({
        'invoice_no': invoice_no
      })
      if (deletedCount && product_deleted) {
        res.status(200).json({ message: `Invoice ${invoice_no} has been deleted` })
      } else {
        res.status(404).json({ message: `Invoice ${invoice_no} cannot found` })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = InvoiceController