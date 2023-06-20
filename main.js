const express = require('express');
const app = express();
const errorHandler = require('express-async-error').Handler;
require('dotenv').config();

// DB connection
require('./db');

//Requiring Routes
// const usersRouter = require("./src/routes/usersRoutes");
const productRouter = require('./src/routes/productsRoutes');
const orderRouter = require('./src/routes/orderRoutes');

// parsing incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// error handler over any async function
app.use(errorHandler());

// Routes

//Order Router
app.use('/orders', orderRouter);
// app.use("/users", usersRouter);
app.use('product', productRouter);

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

app.listen(8000);
