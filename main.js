const express = require('express');
const app = express();
const errorHandler = require('express-async-error').Handler;
require('dotenv').config();

// DB connection
require('./db');

//Requiring Routes
const usersRouter = require('./src/routes/usersRoutes');
const orderRouter = require('./src/routes/orderRoutes');
const libraryRouter=require('./src/routes/libraryRoutes');
const wishlistRouter=require('./src/routes/wishlistRoutes');
const productRouter = require('./src/routes/productsRoutes');
// const cartRouter = require('./src/routes/cartRoutes');

// parsing incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// error handler over any async function
app.use(errorHandler());
// Routes
app.use('/users', usersRouter);
app.use('/orders', orderRouter);
app.use('/libraries',libraryRouter);
app.use('/wishlists',wishlistRouter);
app.use('/products', productRouter);
// app.use('/cart');
// app.use('/wishlist');
// app.use('/library');

app.use((req, res, next) => {
  res.send("<h1 style='text-align:center'>Hello World</h1>");
});
// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({
    status: statusCode,
    message: err?.message || 'Internal Server Error!',
    errors: err?.errors || [],
  });
});

app.listen(+process.env.PORT,(error) =>{
  if(!error)
      console.log("Server is Successfully Running, and App is listening on port "+ +process.env.PORT)
  else
      console.log("Error occurred, server can't start", error);
  }
);
