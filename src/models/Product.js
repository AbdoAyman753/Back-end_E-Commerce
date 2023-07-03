const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const productSchema = new Schema({
  product_name: {
    type: String,
    required: true,
  },

  imgs_links: [
    {
      type: String,
    },
  ], 

  price: {
    type: Number,
    required: true,
  },

  vendor: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
