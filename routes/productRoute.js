const router=require("express").Router();
const Product = require('../models/Product');



//getting filtered product based on Category
router.get('/product/:category',async(req,res)=>{
    const category=req.params.category;
    try{
        const products=await Product.find({category:category});
        res.json(products);

    }catch(err)
    {
        res.send({
            message:err.message,
            success:false,
        });
    }
});


// Category Listing: Create an API endpoint that retrieves a list of categorie

router.get('/categorylist',async(req,res)=>{
     
    console.log("hello");
    try{
        const product=await Product.find();
        let set=new Set();
        
        for(let i=0;i<product.length;i++)
        {
            
                    set.add(product[i].category);
                
              
        }
        if(set.size==0){
            return res.send("No category found");
        }
        
          console.log(set);
          return res.send({
            data:Array.from(set)
          });

    }catch(err)
    {
        res.send(err);
    }
});



// Implement an endpoint that fetches the detailed information of a
// specific product by its ID

router.get('/productdetails/:id',async(req,res)=>{
    const proId=req.params.id;

    try{
        const product=await Product.findById(proId);
        //if product is not present
        if(!product){
            return res.send({
                message:"this product is not found",
                success:false
            })
        }
        res.send({
            data:product,
            success:true
        })
    }catch(err)
    {
        res.send({
            success:false,
            message:err.message
        })
    }
})

module.exports=router;



