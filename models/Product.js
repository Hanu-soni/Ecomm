const mongoose=require("mongoose");

const Product=new mongoose.Schema(
    {
        // name, availability,desc, price, category 
        name: { type: String, required: true },
        avail:{type:Boolean,required:true},
        desc:{type:String,required:true},
        price:{type:Number,required:true},
        category:{type:String,required:true},
    },
    {
        timestamps:true,
    }
);

// const  Product = new Schema({
//     title: String,
//     price: Number,
//     likes: {type: Number, default: 0}
// });
module.exports=mongoose.model("Product",Product);