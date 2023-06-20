const express=require('express');
const router=express.Router();
const {checkId,getAllOrders,getOneOrder,createOrder,updateOrder,deleteOrder}=require('../controllers/orderController')

//Id Check Middleware
router.param('id',checkId)


////Get All The Orders 
router.get('/',getAllOrders)

//Get Specific order with Id

router.get('/:id',getOneOrder);

//Create New Order

router.post('/',createOrder);

//update Order

router.patch('/:id',updateOrder);

//Delete Order

router.delete('/:id',deleteOrder)





module.exports=router;