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
  newestProducts,
  expensiveProducts,
  productImgsCount,
} = require('../controllers/productsControllers');
const { multerUploads } = require('../utils/multer');
const { cloudinaryConfig } = require('../utils/config/cloudinaryConfig');

// get all Products
router.get('/', getAllProducts);

// get The Newest 10 Products
router.get('/newest', newestProducts);

// get The Most Expensive 6 Products
router.get('/expensive', expensiveProducts);

// get Product by Product_id
router.get('/:id', getProductById);

// create a new Product ( Only Admin Can )
router.post(
  '/',
  verifyToken,
  isAdmin,
  multerUploads.array('product_images', 8),
  cloudinaryConfig,
  createProduct
);

// update Product Using product_id ( Only Admin Can )
router.patch(
  '/:id',
  verifyToken,
  isAdmin,
  multerUploads.array('product_images', productImgsCount),
  cloudinaryConfig,
  updateProduct
);

// delete Product Using product_id ( Only Admin Can )
router.delete('/:id', verifyToken, isAdmin, deleteProduct);

module.exports = router;
