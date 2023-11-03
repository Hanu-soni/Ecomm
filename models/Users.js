const mongoose=require("mongoose");

const Users=new mongoose.Schema(
    {
        // User->id , name , password,token,cart,OrderHistory

        name: { type: String, required: true },
        password:{type:String,required:true},
        token:{type:String,required:true},
        cart:{type:[String],required:true},
        history:{type:[String],required:true}//making it simple as time is short
    },
    {
        timestamps:true,
    }
);
module.exports=mongoose.model("User",Users);