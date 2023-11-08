const router=require("express").Router();
const Product = require('../models/Product');
const User=require('../models/Users');
const Order=require('../models/Orders');
const auth=require('../middleware/authorization');


//need to create middleware to verify if token is present 

//I am thinking mean while



//Add product to Cart
router.post('/cart/add',auth,async (req,res)=>{

    //removed auth as it is not working . Not getting the error . why?
    //will work on error
   
    try{
        //2 things will come from front-end [userId, productId]
        const{userId,productId}=req.body;
        const userupdate=await User.findByIdAndUpdate(userId,{$push:{cart:productId}},{new:true});
        if(!userupdate){
            res.send({
                message:"User or product not found",
                success:false
            })
        }
        res.send({
            success:true,
            message:"product added to cart",
            data:userupdate.cart
                   })



    }catch(err)
    {
        
        res.send({
            message:err.message,
            success:false  //fase-->false
        })
    }
})

//update product to Cart
router.put('/cart/update',async(req,res)=>{
    try{
        //2 things will come from front-end [userId, productId]
        const{userId,productId1,productId2}=req.body;
        const user=await User.findById(userId);
        
        if(!user){
            return res.send({
                message:"User not found",
                success:false
            })
        }
        const cartindex=user.cart.findIndex((item)=>item===productId1);
        if(cartindex===-1){
            return res.send({
                message:"Product not found in cart",
                success:false
            })
        }
        user.cart[cartindex]=productId2;
        await user.save();
        res.send({
            success:true,
            message:"product updated successfully",
            data:user.cart
                   })



    }catch(err)
    {
        
        res.send({
            message:err.message,
            success:fase,
        })
    }
})


//delete product from Cart
router.delete('/cart/delete',async(req,res)=>{
    try{
        //2 things will come from front-end [userId, productId]
        const{userId,productId}=req.body;
        
      const userafterdelete=await User.findByIdAndUpdate(userId,{$pull:{cart:productId}},{new:true});
        if(!userafterdelete){
            return res.send({
                message:"Product or user not found in cart",
                success:false
            })
        }
       
        res.send({
            success:true,
            message:"product deleted successfully",
            data:userafterdelete.cart
                   })



    }catch(err)
    {
        
        res.send({
            message:err.message,
            success:false,
        })
    }
})


//placement of order
router.put('/cart/order',async(req,res)=>{

    try{
        //2 things will come from front-end [userId, productId]
        const{userId,productId}=req.body;
        
        const user=await User.findByIdAndUpdate(userId,{$push:{history:productId}},{new:true});
        //console.log(user)
        if(!user){
            return res.send({
                message:"User not found",
                success:false
            })
        }
        //nothing is added to cart
        const cartlength=user.cart;
        if(cartlength===0){
            return res.send({
                message:"No items has been added to cart! Order cannot be placed",
                success:false
            })
        }
        //console.log(user.history);
       
 
        //once order is placed, empty the cart
        User.findByIdAndUpdate(userId,{cart:[]},{new:true});
        const neworder=new Order({date:new Date(),userid:userId,productid:productId});
        await user.save(),neworder.save();
       
        res.send({
            success:true,
            message:"Order placed successfully",
            data:user.history,
                   })



    }catch(err)
    {
        
        res.send({
            message:err.message,
            success:false,
        })
    }
})


//updating the OrderDetails table
router.put('/orderdetails',auth,async(req,res)=>{
    try{
       const order=Order.find();
       if(order.length>0)
       {
        return res.send({
            message:"orderdetails recieved",
            success:true,
            data:order
        })
       }
       return res.send({
        message:"there is no previous order",
        success:false,
        data:"No data"
       })

    }catch(err)
    {
        return res.send({
            message:err.message,
            success:false,
        })
    }
})


router.post('/searchproduct',async (req,res)=>{
    try{

    }catch{
        
    }
})


module.exports =router;





