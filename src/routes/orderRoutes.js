const express=require('express');
const router=express.Router();
const {checkId,getAllOrders,getOneOrder,createOrder,updateOrder,deleteOrder}=require('../controllers/orderController');
const verifyToken = require('../utils/verifyToken');

//Id Check Middleware
// router.param('id',checkId)


////Get All The Orders 
router.get('/',verifyToken,getAllOrders)

//Get Specific order with Id

router.get('/:id',verifyToken,checkId,getOneOrder);

//Create New Order

router.post('/',verifyToken,createOrder);

//update Order

router.patch('/:id',verifyToken,checkId,updateOrder);

//Delete Order

router.delete('/:id',verifyToken,checkId,deleteOrder)





module.exports=router;