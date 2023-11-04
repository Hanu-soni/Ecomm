const mongoose=require("mongoose");

const Users=new mongoose.Schema(
    {
        // User->id , name , password,token,cart,OrderHistory

        email: { type: String, required: true },
        password:{type:String,required:true},
        token:{type:String},
        cart:{type:[String]},
        history:{type:[String]}//making it simple as time is short
    },
    {
        timestamps:true,
    }
);
module.exports=mongoose.model("Users",Users);