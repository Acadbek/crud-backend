const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'pls enter product name']
    }
  },
  {
    timestamps: true
  }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product;