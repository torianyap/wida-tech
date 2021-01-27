function errorHandler (err, req, res, next) {
  let message = err.message || 'Internal Server Error' 
  let status = err.status || 500

  if (err.errors) {
    let errors = []

    Object.values(err.errors)
      .forEach(({ properties }) => {
        if (properties) {
          errors.push(properties.message)
        }
      })
    message = errors.join(', ')
    status = 400
  }
  console.error(err)
  res.status(status).json({ message })
}

module.exports = errorHandler