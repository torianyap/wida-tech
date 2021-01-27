function translateExcelData ({ invoice: invoice_data, 'product sold': product_data }) {
  invoice_data.forEach(data => {
    data['invoice_no'] = data['invoice no']
    data['payment_type'] = data['payment type']
    data.date = new Date(data.date)
    delete data['payment type']
    delete data['invoice no']
  })
  product_data.forEach(product => {
    product['invoice_no'] = product['Invoice no']
    product['total_cost'] = product['total cogs']
    product['total_price'] = product['total price']
    delete product['Invoice no']
    delete product['total cogs']
    delete product['total price']
  })

  return {
    invoice_data,
    product_data
  }
}

module.exports = {
  translateExcelData
}