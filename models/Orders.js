const mongoose=require("mongoose");

const Orders=new mongoose.Schema(
    {
        // Orders->id, date,userid, productid
	

        date: { type: Date, required: true },
       userid:{type:Number,required:true,ref:"Users"},
       productid:{type:Number,required:true,ref:"Product"},
       
    },
    {
        timestamps:true,
    }
);
module.exports=mongoose.model("User",Orders);