const express=require('express');
const verifyToken=require('../utils/verifyToken')
const router=express.Router();
const {deleteWishlist,updateWishlist,getOnewishlist,getUserWishlist,createWishlist}=require('../controllers/wishlistController')

router
    .route('/',)
    .get(verifyToken,getUserWishlist)
    .patch(verifyToken,createWishlist)

router
    .route('/:id')
    .get(verifyToken,getOnewishlist)
    .patch(verifyToken,updateWishlist)
    .delete(verifyToken,deleteWishlist)

module.exports=router;