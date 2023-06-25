const express=require('express');

const router=express.Router()

const verifyToken=require('../utils/verifyToken');

const {checkId,getOneLibrary,getUserLibrary,createLibrary,updateLibrary,deleteLibrary,updateUserLibrary}=require('../controllers/libraryController');
const isAdmin = require('../utils/isAdmin');




router.
    route('/')
    .get(verifyToken,getUserLibrary)
    .post(verifyToken,createLibrary)
    .patch(verifyToken,updateUserLibrary)
router
    .route('/:id')
    .get(verifyToken,checkId,getOneLibrary)
    .patch(verifyToken,checkId,updateLibrary)
    .delete(verifyToken,checkId,deleteLibrary)



module.exports=router