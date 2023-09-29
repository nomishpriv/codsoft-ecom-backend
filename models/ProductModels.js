const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  categoryName: {
    type: String,
  },
  productName: {
    type: String,
  },
  price: {
    type: String,
  },
  fabric: {
    type: String,
  },
  piece: {
    type: String,
  },
  img: {
    type: String,
  },
});


module.exports = mongoose.model('products', productsSchema)