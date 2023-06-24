const Product = require('../models/Product');
const AppError = require('../utils/AppError');

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

// The Logic Below Is Designed For The Patch HTTP Method Only.
const updateProduct = async (req, res, next) => {
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

  const editedProduct = await Product.findByIdAndUpdate(product_id, {
    product_name,
    imgs_links,
    price,
    vendor,
    category,
    description,
    reviews,
  });
  res.send({ message: 'Product updated successfully!', editedProduct });
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
