const express=require('express');
const verifyToken=require('../utils/verifyToken')
const router=express.Router();
const {deleteWishlist,updateWishlist,getOnewishlist,getUserWishlist,createWishlist,checkId}=require('../controllers/wishlistController')


router
    .param('/:id',verifyToken,checkId)
router
    .route('/',)
    .get(verifyToken,getUserWishlist)
    .patch(verifyToken,createWishlist)

router
    .route('/:id')
    .get(getOnewishlist)
    .patch(updateWishlist)
    .delete(deleteWishlist)

module.exports=router;