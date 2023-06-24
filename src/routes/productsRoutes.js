const express = require('express');
const router = express.Router();

// verify req have token and based on token asingn the user to the req
const verifyToken = require('../utils/verifyToken');
const isAdmin = require('../utils/isAdmin');

// Product Controllers
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productsControlers');

// get all Products
router.get('/', getAllProducts);

// get Product by Product_id
router.get('/:id', getProductById);

// create a new Product
router.post('/', verifyToken, isAdmin, createProduct);

// update Product Using product_id ( Only Admin Can )
router.patch('/:id', verifyToken, isAdmin, updateProduct);

// delete Product Using product_id ( Only Admin Can )
router.delete('/:id', verifyToken, isAdmin, deleteProduct);

module.exports = router;