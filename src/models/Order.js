const mongoose=require('mongoose');
const { schema } = require('./User');

const{Schema}=mongoose;

const order=new Schema({
    user:{
        type:Number
        // type: Schema.Types.ObjectId,
        // ref:'User',
        // required:true
    },
    products:[{
            product_id:Number,
            productName:String
        // type: Schema.Types.ObjectId,
        // ref:'Product',
        // required:true
    }],
    status:{
        type:String,
        enum:['successful','declined','inprogress'],
        default:'inprogress'
    },
    createdAt:{
        type:Date,
        default: Date.now()
    }
})

const Order = mongoose.model("Order", order);
module.exports = Order;
