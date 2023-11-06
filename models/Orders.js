const mongoose=require("mongoose");

const Orders=new mongoose.Schema(
    {
        // Orders->id, date,userid, productid
	

        date: { type: Date, required: true },
       userid:{type:String,required:true},
       productid:{type:String,required:true},
       
    },
    {
        timestamps:true,
    }
);
module.exports=mongoose.model("User",Orders);