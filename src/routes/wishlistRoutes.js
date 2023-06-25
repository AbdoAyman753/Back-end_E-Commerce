const express=require('express');
const verifyToken=require('../utils/verifyToken')
const router=express.Router();
const {emptyWishlist,updateWishlist,getOnewishlist,getUserWishlist,createWishlist,checkId}=require('../controllers/wishlistController')


router
    .route('/',)
    .get(verifyToken,getUserWishlist)
    .post(verifyToken,createWishlist)
    .patch(verifyToken,updateWishlist)
    

router
    .route('/:id')
    .get(verifyToken,checkId,getOnewishlist)
    .patch(verifyToken,checkId,updateWishlist)
    .delete(verifyToken,checkId,emptyWishlist)

module.exports=router;