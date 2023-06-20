const Product = require('../models/Product');
const AppError = require('../utils/AppError');

// const jwt = require('jsonwebtoken');

const getAllProducts = async (req, res, next) => {
  const Products = await Product.find();
  res.send(Products);
};

const getProductById = async (req, res, next) => {
  const product_id = req.params.id;
  const product = await Product.findById(product_id);
  if (!product) return next(new AppError('Product Not Found!', 400));
  res.send(product);
};

const createProduct = async (req, res, next) => {
  const { product_name, imgs_links, price, vendor, category, description } =
    req.body;

  const createdProduct = await Product.create({
    product_name,
    imgs_links,
    price,
    vendor,
    category,
    description,
  });
  if (!createdProduct) return next(new AppError('Product Not Found!', 400));
  res.send({
    message: 'Product Created Successfully!',
    Product: createProduct,
  });
};

const updateProduct = async (req, res, next) => {
  // if (userRole == admin) {

  const product_id = req.params.id;
  const {
    product_name,
    imgs_links,
    price,
    vendor,
    category,
    description,
    reviews,
  } = req.body;

  const product = await Product.findById(product_id);
  if (!product)
    return next(new AppError('Product With The Provided Id Not Found 🤷‍♀️', 400));

  const updates = {};

  updates.Product_name = product_name ? product_name : Product.Product_name;

  updates.imgs_links = imgs_links ? imgs_links : Product.imgs_links;

  updates.price = price ? price : Product.price;

  updates.vendor = vendor ? vendor : Product.vendor;

  updates.category = category ? category : Product.category;

  updates.description = description ? description : Product.description;

  updates.reviews = reviews ? reviews : Product.reviews;

  const editedProduct = await Product.findByIdAndUpdate(product_id, updates);
  res.send({ message: 'Product updated successfully!', editedProduct });
  // } else {
  // res.send('You Are Not authorized');
  // }
};

const deleteProduct = async (req, res, next) => {
  const product_id = req.params.id;
  const product = await Product.findById(product_id);
  if (!product)
    return next(new AppError('Product With The Provided Id Not Found 🤷‍♀️', 400));

  const deletedProduct = await Product.findByIdAndDelete(product_id);

  res.send({ message: 'Product deleted successfully!', deletedProduct });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
