const express=require('express');

const router=express.Router()

const verifyToken=require('../utils/verifyToken');

const {checkId,getOneLibrary,getUserLibrary,createLibrary,updateLibrary,deleteLibrary}=require('../controllers/libraryController');
const isAdmin = require('../utils/isAdmin');

router.param('id',verifyToken,checkId);
//// get All Purchase History
router.get('/',verifyToken,isAdmin)
//get One Purchase History 


router.
    route('/')
    .get(verifyToken,getUserLibrary)
    .post(verifyToken,createLibrary)
router
    .route('/:id')
    .get(getOneLibrary)
    .patch(updateLibrary)
    .delete(deleteLibrary)



module.exports=router