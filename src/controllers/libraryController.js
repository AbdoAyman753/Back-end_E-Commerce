const express = require("express");
const Library = require("../models/Library");
const AppError = require("../utils/AppError");

const checkId = async (req, res, next) => {
  const library = await Library.findById(req.params.id);
  if (!library)
    return next(
      new AppError(`No purchase History with This Id ${req.params.id}`, 404)
    );
  if (
    req.user.role === "admin" ||
    req.user._id.toString() === library.user._id.toString()
  ) {
    req.library = library;
    next();
  } else {
    return next(
      new AppError("You Aren't Authorized To access this purchase History", 401)
    );
  }
};

const getAllLibraries = async (req, res, next) => {
  const libraries = await Library.find();
  if (!libraries) return next(new AppError(`No Purchase Histories Found`, 404));
  res.status(200).send(libraries);
};

const getOneLibrary = async (req, res) => {
  res.status(200).send(req.Library);
};

const createLibrary = async (req, res, next) => {
  const { products } = req.body;
  if (!products)
    return next(new AppError("Please choose the products again", 404));
  const newLibrary = new Library({
    user: req.user._id,
    products,
  });
  if (!newLibrary)
    return next(new AppError(`Please Choose Your Products again`, 500));
  await newLibrary.save();

  res.status(201).send(newLibrary);
};

const updateLibrary = async (req, res, next) => {
  const { products } = req.body;
  if (!products) return next(new AppError("No Updates Values Found", 400));

  const newLibrary = await Library.findById(req.library._id);
  newLibrary.products.push(...products);
  await Library.findByIdAndUpdate(req.library._id, {
    products: newLibrary.products,
  });
  res
    .status(201)
    .send(`The Purchase List With Id ${req.library._id} Has Been updated`);
};

const updateUserLibrary = async (req, res, next) => {
  const { products } = req.body;
  if (!products) return next(new AppError("No Updates Values Found", 400));
  const newLibrary = await Library.findOne({ user: req.user._id });
  newLibrary.products.push(...products);
  await Library.findByIdAndUpdate(newLibrary._id, {
    products: newLibrary.products,
  });
  res
    .status(201)
    .send(`The Purchase List With Id ${newLibrary._id} Has Been updated`);
};

const deleteLibrary = async (req, res) => {
  await Library.findByIdAndDelete(req.library._id);
  res
    .status(200)
    .send(`Library with Id=${req.library._id} has been deleted Successfully`);
};

const getUserLibrary = async (req, res) => {
  const library = await Library.findOne({ user: req.user._id });
  res.status(200).send(library);
};

module.exports = {
  checkId,
  getOneLibrary,
  getUserLibrary,
  createLibrary,
  updateLibrary,
  deleteLibrary,
  updateUserLibrary,
};
