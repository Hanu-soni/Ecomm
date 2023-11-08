const router=require("express").Router();
const Product = require('../models/Product');
const User=require('../models/Users');
const Order=require('../models/Orders');
const auth=require('../middleware/authorization');


//need to create middleware to verify if token is present 

//I am thinking mean while



//Add product to Cart
router.post('/cart/add',async (req,res)=>{

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



//filtering Product based on Users search
// router.get('/SearchByName/:search',async (req,res)=>{
//     const query=req.params.search;
    
//     try{
//         // "Laptop"-->split L a p t o p
//         console.log("hello")
        
//         console.log(query);

//         if (!query) {
//             return res.send({
//                 message:"query is not provided",
//                 success:false
//             })
//           }

          
//           const products = await Product.find({
//             $or: [
//               { name: { $eq: query } }, // Check for exact name match
//               { category: { $eq: query } } // Check for exact category match
//             ]
//           });
//         if (products.length === 0) {
//             return res.send({
//               message: "No products found matching the query",
//               success: true,
//               data: []
//             });
//           }

//           return res.send({
//             data:products,
//             success:true
//           })

//     }catch(err){
//             return res.send({
//                 message:err.message,
//                 success:false
//             })
        
//     }
// })
router.get('/Search/:search',async (req,res)=>{
    const query=req.params.search;
    
    try{
        // "Laptop"-->split L a p t o p
        console.log("hello")
        
        console.log(query);

        if (!query) {
            return res.send({
                message:"query is not provided",
                success:false
            })
          }

          
          const products = await Product.find({});
          let result=new Array();
          

          //NORMAL SEARCH OF CAT OR PRODUCT
          for(let i=0;i<products.length;i++){

            //console.log(products[i].name);
            if(products[i].name==query || products[i].category==query){
                result.push(products[i]);
            }

            //IF USER SEARCH FOR PRODUCT OR CAT SOMEWHAT CLOSE TO LIST
            else
            {
                let productname=products[i].name.toLowerCase();
                
                let productcat=products[i].category.toLowerCase();
                // console.log(productname,"  ",productcat)
                let querynew=query.substring(0,4).toLowerCase();
                // console.log(querynew);
                if(productcat.includes(querynew)|| productname.includes(querynew)){
                    result.push(products[i]);
                }
                
                
            }
          }
          
          //console.log(products);
          //console.log(result)
        if (result.length === 0) {
            return res.send({
              message: "No products found matching the query",
              success: true,
              data: []
            });
          }

          return res.send({
            data:result,
            success:true
          })

    }catch(err){
            return res.send({
                message:err.message,
                success:false
            })
        
    }
})






module.exports =router;





