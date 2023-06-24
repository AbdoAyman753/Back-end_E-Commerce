const express=require('express');

const Wishlist=require('../models/Wishlist');
const Wishlist = require('../models/Wishlist');

const checkId=async (req,res,next,val)=>{
    const Wishlist= await Wishlist.findById(val);
    if(!library) return (new AppError(`No purchase History with This Id ${val}`,404));
    if(req.user.role==='admin'||req.user._id === library.user._id){
        req.wishlist=wishlist;
        next()
    }else{
         return(new AppError("You Aren't Authorized To access this purchase History",401))
    }
}

const getUserWishlist=async(req,res)=>{
    
    const wishlist=await Wishlist.find({user:req.user._id});
    res.status(200).send(wishlist);
    
}

const getOnewishlist=async(req,res)=>{

    res.status(200).send(req.wishlist);
}

const  updateWishlist=async(req,res)=>{
    const{products}=req.body;
    if(!products)return (new AppError ('No Updates Values Found',400))
  const newWishlist = await Wishlist.findById(req.library._id)
  newWishlist.products.push(...products);
  await Wishlist.findByIdAndUpdate(req.wishlist._id,{products:newWishlist.products})
  res.status(201).send(`The Purchase LIst With Id ${req.wishlist._id} Has Been updated`)

}

const deleteWishlist=async(req,res)=>{
    await Wishlist.findByIdAndDelete(req.wishlist._id);
    res.status(200).send(`LIbrary with Id=${req.wishlist._id} has been deleted Successfully`)
}
const createWishlist=async(req,res)=>{
    const{products}= req.body;
    if(!products) return (new AppError('Please choose the products again',404))
    const newWishlist= new Wishlist({
        user:req.user._id,
        products
    })
    if(!newWishlist) return(new AppError(`Please Choose Your Products again`,500))
    await newWishlist.save()
    
    res.status(201).send(newWishlist)
}


module.exports={deleteWishlist,updateWishlist,getOnewishlist,getUserWishlist,createWishlist}