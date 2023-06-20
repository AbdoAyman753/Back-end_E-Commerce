
const express=require('express');
const Order=require('../models/Order');
const AppError= require('../utils/AppError');


// Id Check Middleware
 const checkId= async (req,res,next,val)=>{
    const order= await Order.findById(val);
    if(!order) return (new AppError(`No Order Found With id=${val}`,404));
    req.order=order;
    next();
}

// Get all Orders
const getAllOrders= async (req,res,err)=>{
    const orders= await Order.find();
    if(!orders) return (new AppError(`No Orders exists`, 404))
    res.status(200).send(orders)
}

// Get One User
const getOneOrder=async(req,res)=>{

    res.send(req.order);
}

const createOrder=async(req,res)=>{
    const{user,products}=req.body;
    if(!user || !products) return (new AppError('Please provide product and user Information',400));
    const newOrder= new Order({user,products});
    await newOrder.save()
    res.status(201).send("Order Has been Created Successfully")

}
//Update Order
const updateOrder=async(req,res)=>{
    const{products}=req.body;
    if(!products) return (new AppError("No Order update has been Found",400));

    await Order.findByIdAndUpdate(req.order._id,{products:products});

    res.status(200).send(`The Order with id=${req.order._id} Has been Updated Successfully`);
 }

// Delete Order
const deleteOrder=async(req,res)=>{
    await Order.findByIdAndDelete(req.order._id);
    res.status(200).send(`Order with Id=${req.order._id} has been deleted Successfully`)
}

module.exports={checkId,getAllOrders,getOneOrder,createOrder,updateOrder,deleteOrder}