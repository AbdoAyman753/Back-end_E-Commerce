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
const { multerUploads } = require('../utils/multer');
const { cloudinaryConfig } = require('../utils/config/cloudinaryConfig');

// get all Products
router.get('/', getAllProducts);

// get Product by Product_id
router.get('/:id', getProductById);

// create a new Product
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
  multerUploads.array('product_images', 8),
  cloudinaryConfig,
  updateProduct
);

// delete Product Using product_id ( Only Admin Can )
router.delete('/:id', verifyToken, isAdmin, deleteProduct);

module.exports = router;
