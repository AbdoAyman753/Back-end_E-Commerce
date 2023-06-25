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
} = require('../controllers/productsControllers');

// get all Products
router.get('/', getAllProducts);

// get Product by Product_id
router.get('/:id', getProductById);

// create a new Product
router.post('/', verifyToken, isAdmin, createProduct);
// router.post('/', createProduct); // Just For Development testing 🧪

// update Product Using product_id ( Only Admin Can )
router.patch('/:id', verifyToken, isAdmin, updateProduct);
// router.patch('/:id', updateProduct); // Just For Development testing 🧪

// delete Product Using product_id ( Only Admin Can )
router.delete('/:id', verifyToken, isAdmin, deleteProduct);
// router.delete('/:id', deleteProduct); // Just For Development testing 🧪

module.exports = router;
