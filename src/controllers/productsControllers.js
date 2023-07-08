const Product = require('../models/Product');
const AppError = require('../utils/AppError');
const { uploader } = require('../utils/config/cloudinaryConfig');
const { dataUri } = require('../utils/multer');

function refineStrings(string) {
  // removing special characters
  const noSpecialChars = string.replace(/[^\w\s]|_/g, '');
  // Remove emojis
  noEmojis = noSpecialChars.replace(/[\u{1F300}-\u{1F6FF}]/gu, '');
  // Trim leading and trailing white spaces
  // Replace remaining spaces with underscores
  return noEmojis.trim().replace(/\s+/g, '_');
}

const getAllProducts = async (req, res, next) => {
  const Products = await Product.find().sort({created_at: -1});
  const categoryList = Product.schema.path('category').enumValues;
  res.send({ Products, categoryList });
};

const getProductById = async (req, res, next) => {
  const product_id = req.params.id;
  const product = await Product.findById(product_id);
  if (!product) return next(new AppError('Product Not Found!', 400));
  res.send(product);
};

const createProduct = async (req, res, next) => {
  const { product_name, price, vendor, category, description } = req.body;
  // 1- recive product_images from the req and send it to multer middleware
  // 2- multer send me arr of objects for every image as a req.files
  // 3- extract every image and uploade it to cloudinary using dataUri() and uploader.upload()
  // 4- return array of [...images url] as a uploadedImages

  let uploadedImages = [];
  if (req.files && req.files.length > 0) {
    const uploadPromises = req.files.map(async (file) => {
      const buffImage = dataUri(file);
      try {
        const uploadedImage = await uploader.upload(buffImage.content, {
          public_id: file.originalname,
          folder: `products_images/${refineStrings(product_name)}_images`,
        });
        return uploadedImage?.secure_url || null;
      } catch (err) {
        return next(
          new AppError(
            `failed to upload image to Cloudnary error is ${err}`,
            500
          )
        );
      }
    });

    // To Await All the Upload Promises To Ensures That All Images are Uploaded Before Proceeding.
    uploadedImages = await Promise.all(uploadPromises);
  } else {
    return next(
      new AppError('Must Provide 1 to 8 Images That Descripe The Product', 400)
    );
  }

  const createdProduct = await Product.create({
    product_name,
    imgs_links: uploadedImages,
    price,
    vendor,
    category,
    description,
  });
  if (!createdProduct)
    return next(new AppError("Product Couldn't Be Created", 400));
  res.send({
    message: `Product ${product_name} Created Successfully!`,
    createdProduct,
  });
};

// The Logic Below Is Designed For The Patch HTTP Method Only.
const updateProduct = async (req, res, next) => {
  const product_id = req.params.id;
  const {
    product_name,
    price,
    vendor,
    category,
    description,
    reviews,
    old_images,
  } = req.body;

  const product = await Product.findById(product_id);
  if (!product)
    return next(new AppError('Product With The Provided Id Not Found 🤷‍♀️', 400));

  let uploadedImages = [];
  if (req.files) {
    const uploadPromises = req.files.map(async (file) => {
      const buffImage = dataUri(file);
      try {
        const uploadedImage = await uploader.upload(buffImage.content, {
          public_id: file.originalname,
          folder: `products_images/${refineStrings(
            product.product_name
          )}_images`,
        });
        return uploadedImage?.secure_url || null;
      } catch (err) {
        return next(
          new AppError(
            `failed to upload image to Cloudnary error is ${err}`,
            500
          )
        );
      }
    });

    // To Await All the Upload Promises To Ensures That All Images are Uploaded Before Proceeding.
    uploadedImages = await Promise.all(uploadPromises);
  }

  let updatedImgsLinks;

  if (uploadedImages.length && old_images.length) {
    updatedImgsLinks = [...old_images, ...uploadedImages];
  } else if (uploadedImages.length) {
    updatedImgsLinks = uploadedImages;
  } else if (old_images.length) {
    updatedImgsLinks = old_images;
  } else {
    updatedImgsLinks = product.imgs_links;
  }

  const editedProduct = await Product.findByIdAndUpdate(
    product_id,
    {
      product_name,
      imgs_links: updatedImgsLinks,
      price,
      vendor,
      category,
      description,
      reviews,
    },
    { new: true }
  );
  res.send({
    message: 'Product updated successfully!',
    Product: editedProduct,
  });
};

const deleteProduct = async (req, res, next) => {
  const product_id = req.params.id;
  const product = await Product.findById(product_id);
  if (!product)
    return next(new AppError('Product With The Provided Id Not Found 🤷‍♀️', 400));

  const deletedProduct = await Product.findByIdAndDelete(product_id);

  res.send({
    message: `Product ${product.product_name} deleted successfully!`,
    deletedProduct,
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
