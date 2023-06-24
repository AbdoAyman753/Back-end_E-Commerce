const mongoose= require('mongoose');

const {Schema}=mongoose;

const librarySchema= new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    products:[{
        type:Schema.Types.ObjectId,
        ref:'Product',
        required:true
    }]
})


const Library=mongoose.model('Library',librarySchema);

module.exports=Library;