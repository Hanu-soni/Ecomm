

//these are some of the requirement libraries. If any other middleware or lib needed, add it
//accordingly 
const  User=require('../models/Users');
const router=require("express").Router();
const bcrypt=require("bcryptjs");
const jwt=require('jsonwebtoken');

router.post('/user/register',async(req,res)=>{
    try{
            // res.render('/pankaj')
        
        const email=await User.findOne({email:req.body.email});



        //checking if already exist
        if(email)
        {
            return res.send({
                success:false,
                message:"User already exists",
            });
        }
        //we can also give more validation here like regeX exp or length of string
        //we can hash the password 
        const hashPass=await bcrypt.hash(req.body.password,10);
        req.body.password=hashPass;
        const newUser=new User(req.body);
        await newUser.save();
        res.send({
            success:true,
            message:"User added successfully",
        })


    }catch(err)
    {
        res.send({
            message:err.message,
            success:false,
        });
    }
});


//user login

router.post('/user/login',async(req,res)=>{
    try{
        const email=await User.findOne({email:req.body.email});
        console.log(email)
        //checking if is present in data
        if(!email)
        {
            return res.send({
                success:false,
                message:"invalid email",
            });
        }
        //checking password
        //it will check if  hashed password  matches with the login password
        const password=await bcrypt.compare(req.body.password,email.password);

        if(!password){
            return res.send({
                success:false,
                message:"Invalid password"
            })
        }
        //generate token
        const token=jwt.sign({userId:email._id},process.env.JWT_SECRET,{
            expiresIn:"1d",
        })
        res.send({
            success:true,
            message:"User logged in sucessfully",
            data:token
        })




    }catch(err)
    {
        res.send({
            message:err.message,
            success:false,
        });
    }
});



// Develop API endpoints to allow users to add products to their
// cart, view the cart, update quantities, and remove items from the car
//need the authorization of user 

router.get('/user/getalluser',async(req,res)=>{
    try{
        const user=await User.find();
        console.log(user);
        let array=new Array();//for storing username
        for(let i=0;i<user.length;i++){
            if(user[i].email!=null)
            array.push(user[i].email);
        }
        res.send({
            success:"true",
            data:array
        })

    }catch(err){
        res.send({
            success:false,
            message:err.message
        })

    }
})

router.get('/example',(req,res)=>{
    const data=User.find({});
    res.render('example',{data:data});
})




module.exports=router;




