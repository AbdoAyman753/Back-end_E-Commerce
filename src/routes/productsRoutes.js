const express = require('express');
const router = express.Router();

const verifyToken = require('../utils/verifyToken'); // logged in users, admins, or super admins

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
router.post('/', verifyToken, createProduct);

// update Product Using product_id ( Only Admin Can )
router.patch('/:id', verifyToken, updateProduct);

// delete Product Using product_id ( Only Admin Can )
router.delete('/:id', verifyToken, deleteProduct);

module.exports = router;
