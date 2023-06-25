const express=require('express')
const Wishlist=require('../models/Wishlist');
const AppError = require('../utils/AppError');
const verifyToken = require('../utils/verifyToken');




const checkId=async (req,res,next)=>{
    const wishlist= await Wishlist.findById(req.params.id);
    console.log(wishlist);
    if(!wishlist) return next(new AppErrorError(`No purchase History with This Id ${req.params.id}`,404));
    console.log(wishlist.user);
    console.log(req.user._id == wishlist.user)
    if(req.user.role==='admin'||req.user._id.toString() == wishlist.user.toString()){
        req.wishlist=wishlist;
        next()
    }else{
         return next(new AppError("You Aren't Authorized To access this purchase History",401))
    }
}


const getUserWishlist=async(req,res)=>{
    
    const wishlist=await Wishlist.find({user:req.user._id});
    res.status(200).send(wishlist);
    
}

const getOnewishlist=async(req,res)=>{
    const wishlist= await Wishlist.findById(req.params.id)
    res.status(200).send(wishlist);
}

const  updateWishlist=async(req,res,next)=>{
        const { products } = req.body;
        if (!products) return next(new AppError("No Updates Values Found", 404));
        const wishlist= await Wishlist.findOne({user:req.user._id});
        console.log(wishlist);
        // const wishlist = await Wishlist.findById(req.wishlist._id);
        wishlist.products.push(...products);
        await Wishlist.findByIdAndUpdate(wishlist._id, { products: wishlist.products });
        res.status(201).send(
            `Wishlist With Id ${wishlist._id} Has Been updated`
        );
    

}

const emptyWishlist=async(req,res)=>{
    console.log(req.wishlist);
    await Wishlist.findByIdAndUpdate(req.wishlist._id,{products:[]});
    res.status(200).send(`Wishlist with Id=${req.wishlist._id} has been deleted Successfully`)
}
const createWishlist=async(req,res)=>{
    const{products}= req.body;
    if(!products) return (new AppError('Please choose the products again',404))
    const newWishlist= new Wishlist({
        user:req.user._id,
        products:products
    })
    if(!newWishlist) return(new AppError(`Please Choose Your Products again`,500))
    await newWishlist.save()
    
    res.status(201).json({message:'Wishlist has been Created',data:newWishlist})
}


module.exports={emptyWishlist,updateWishlist,getOnewishlist,getUserWishlist,createWishlist,checkId}