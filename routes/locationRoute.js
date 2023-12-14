const router=require("express").Router();
const Locations = require('../models/Location');


//need to create middleware to verify if token is present 

//I am thinking mean while



//Add new-Location to DB
router.post('/location/add',async (req,res)=>{

    
   
    try{
        //2 things will come from front-end [userId, productId]
        const{name,lat,lon}=req.body;
        console.log(name,lat,lon);
        const locupdate=await Locations.insertMany({name:name,lat:lat,lon:lon},{new:true});
        if(!locupdate){
            res.send({
                message:"There is some error in Data or its type",
                success:false
            })
        }
        res.send({
            success:true,
            message:"Data added to Locations successfully",
            data:locupdate
            
                   })



    }catch(err)
    {
        
        res.send({
            message:err.message,
            success:false  //fase-->false
        })
    }
})



router.get('/location/getAll',async (req,res)=>{

    
   
    try{
        //2 things will come from front-end [userId, productId]
       
        const locationAll=await Locations.find();
        if(!locationAll){
            res.send({
                message:"There is no location added till now",
                success:false
            })
        }
        res.send({
            success:true,
            message:"got data",
            data:locationAll
            
                   })



    }catch(err)
    {
        
        res.send({
            message:err.message,
            success:false  //fase-->false
        })
    }
})

//update Location based on ID
router.put('/location/update',async(req,res)=>{
    try{
        //2 things will come from front-end [id,{newloc,lat,lon}]
        const{id,name,lat,lon}=req.body;
        const newlocation=await Locations.findById(id);
        
        if(!newlocation){
            return res.send({
                message:"Location not found in DB",
                success:false
            })
        }
        
        
        newlocation.name=name;
         newlocation.lat=lat;
           newlocation.lon=lon;
        await newlocation.save();
        res.send({
            success:true,
            message:"location updated successfully",
            data:newlocation
                   })



    }catch(err)
    {
        
        res.send({
            message:err.message,
            success:false,
        })
    }
})


// //delete product from Cart
router.delete('/location/delete',async(req,res)=>{
    try{
        //2 things will come from front-end [userId, productId]
        const{id}=req.body;
        
      const locationafterdelete=await Locations.findByIdAndDelete(id);
        if(!locationafterdelete){
            return res.send({
                message:"Location not found",
                success:false
            })
        }
       
        res.send({
            success:true,
            message:"Location deleted successfully",
            data:locationafterdelete
                   })



    }catch(err)
    {
        
        res.send({
            message:err.message,
            success:false,
        })
    }
})


// //placement of order
// router.put('/cart/order',async(req,res)=>{

//     try{
//         //2 things will come from front-end [userId, productId]
//         const{userId,productId}=req.body;
        
//         const user=await User.findByIdAndUpdate(userId,{$push:{history:productId}},{new:true});
//         //console.log(user)
//         if(!user){
//             return res.send({
//                 message:"User not found",
//                 success:false
//             })
//         }
//         //nothing is added to cart
//         const cartlength=user.cart;
//         if(cartlength===0){
//             return res.send({
//                 message:"No items has been added to cart! Order cannot be placed",
//                 success:false
//             })
//         }
//         //console.log(user.history);
       
 
//         //once order is placed, empty the cart
//         User.findByIdAndUpdate(userId,{cart:[]},{new:true});
//         const neworder=new Order({date:new Date(),userid:userId,productid:productId});
//         await user.save(),neworder.save();
       
//         res.send({
//             success:true,
//             message:"Order placed successfully",
//             data:user.history,
//                    })



//     }catch(err)
//     {
        
//         res.send({
//             message:err.message,
//             success:false,
//         })
//     }
// })


// //updating the OrderDetails table
// router.put('/orderdetails',auth,async(req,res)=>{
//     try{
//        const order=Order.find();
//        if(order.length>0)
//        {
//         return res.send({
//             message:"orderdetails recieved",
//             success:true,
//             data:order
//         })
//        }
//        return res.send({
//         message:"there is no previous order",
//         success:false,
//         data:"No data"
//        })

//     }catch(err)
//     {
//         return res.send({
//             message:err.message,
//             success:false,
//         })
//     }
// })



// //filtering Product based on Users search
// // router.get('/SearchByName/:search',async (req,res)=>{
// //     const query=req.params.search;
    
// //     try{
// //         // "Laptop"-->split L a p t o p
// //         console.log("hello")
        
// //         console.log(query);

// //         if (!query) {
// //             return res.send({
// //                 message:"query is not provided",
// //                 success:false
// //             })
// //           }

          
// //           const products = await Product.find({
// //             $or: [
// //               { name: { $eq: query } }, // Check for exact name match
// //               { category: { $eq: query } } // Check for exact category match
// //             ]
// //           });
// //         if (products.length === 0) {
// //             return res.send({
// //               message: "No products found matching the query",
// //               success: true,
// //               data: []
// //             });
// //           }

// //           return res.send({
// //             data:products,
// //             success:true
// //           })

// //     }catch(err){
// //             return res.send({
// //                 message:err.message,
// //                 success:false
// //             })
        
// //     }
// // })
// router.get('/location/:search',async (req,res)=>{
//      const query=req.params.search;
    
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

          
//           const products = await Product.find({}).maxTimeMS(30000);
       
//           let result=new Array();
          

//           //NORMAL SEARCH OF CAT OR PRODUCT
//           for(let i=0;i<products.length;i++){

//             console.log(products[i].name);
//             if(products[i].name==query || products[i].category==query){
//                 result.push(products[i]);
//             }
//             //I am making a front-end page for the following

//             // IF USER SEARCH FOR PRODUCT OR CAT SOMEWHAT CLOSE TO LIST
//             else
//             {
//                 let productname=products[i].name.toLowerCase();
                
//                 let productcat=products[i].category.toLowerCase();
//                 console.log(productname,"  ",productcat)
//                 let querynew=query.substring(0,2).toLowerCase();
//                 console.log(querynew);
//                 if(productcat.includes(querynew)|| productname.includes(querynew)){
//                     result.push(products[i]);
//                 }
                
                
//             }
//           }
          
//           console.log(products);
//           console.log(result)
//         if (result.length === 0) {
//             return res.send({
//               message: "No products found matching the query",
//               success: true,
//               data: []
//             });
//           }

//           return res.send({
//             data:result,
//             success:true
//           })

//     }catch(err){
//             return res.send({
//                 message:err.message,
//                 success:false
//             })
        
//     }
// })


// router.get('/example1',async (req,res)=>{
//     // const data=User.find({});
//     // 
//     try{
//         const user=await Product.find();
//         res.render('example',{data:user});

//     }catch(err){
//         res.send({
//             success:false,
//             message:err.message
//         })

//     }
    
// })








module.exports =router;





