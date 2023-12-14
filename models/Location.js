const mongoose=require("mongoose");

const locations=new mongoose.Schema(
    {
        // name, availability,desc, price, category 
        name: { type: String, required: true },
        lat :{type:Number,required:true},
        lon:{type:Number,required:true},
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
module.exports=mongoose.model("locations",locations);