const express = require("express");
const Order = require("../models/Order");
const AppError = require("../utils/AppError");

// ـــــــــــــــــــــــــــــــــــــ Id Check  ـــــــــــــــــــــــــــــــــــــ
const checkId = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order)
    return next(new AppError(`No Order Found With id=${req.params.id}`, 404));
  if (
    req.user.role === "admin" ||
    req.user._id.toString() === library.user._id.toString()
  ) {
    req.order = order;
    next();
  } else {
    return next(
      new AppError("You Aren't Authorized To access this Order", 401)
    );
  }
};

// ــــــــــــــــــــــــــــــــــــــ Get all Orders ــــــــــــــــــــــــــــــــــــــ
const getAllOrders = async (req, res, err) => {
  const orders = await Order.find();
  if (!orders) return next(new AppError(`No Orders exists`, 404));
  res.status(200).send(orders);
};

// ــــــــــــــــــــــــــــــــــ Get User Order by Id ـــــــــــــــــــــــــــــــــــــ
const getOneOrder = async (req, res) => {
  res.send(req.order);
};
// ــــــــــــــــــــــــــــــــــــــ Create Order ____________________________________________
const createOrder = async (req, res, next) => {
  const { user, products } = req.body;
  if (!user || !products)
    return next(
      new AppError("Please provide product and user Information", 400)
    );
  const newOrder = new Order({ user, products });
  await newOrder.save();
  res.status(201).send("Order Has been Created Successfully");
};
//  ــــــــــــــــــــــــــــــ  Update Order  ـــــــــــــــــــــــــــــــــــــــــــــ
const updateOrder = async (req, res, next) => {
  const { products } = req.body;
  if (!products)
    return next(new AppError("No Order update has been Found", 400));

  await Order.findByIdAndUpdate(req.order._id, { products: products });

  res
    .status(200)
    .send(`The Order with id=${req.order._id} Has been Updated Successfully`);
};

// ـــــــــــــــــــــــــــــــــــــــ Delete Order ــــــــــــــــــــــــــــــــــــــــــ
const deleteOrder = async (req, res) => {
  await Order.findByIdAndDelete(req.order._id);
  res
    .status(200)
    .send(`Order with Id=${req.order._id} has been deleted Successfully`);
};

module.exports = {
  checkId,
  getAllOrders,
  getOneOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
