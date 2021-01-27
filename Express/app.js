const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const mongoose = require('mongoose')
const fileupload = require('express-fileupload')
const error_handler = require('./middlewares/error_handler')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use(fileupload())
app.use(express.urlencoded({ extended: true }))
app.use(routes)
app.use(error_handler)

mongoose
  .connect('mongodb://localhost:27017/sales_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log('mongoose connected')
    app.listen(PORT, () => console.log(`listening at https://localhost:${PORT}`))
  })
  .catch(console.error)