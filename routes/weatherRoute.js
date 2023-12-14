const router=require("express").Router();
const { request } = require("http");
const Locations = require('../models/Location');
const axios=require('axios');






router.post('/weather',async (req,res)=>{

    
   
    try{
        const {id}=req.body;
        console.log(id)
        //2 things will come from front-end [userId, productId]
        
        //I am checking if the id entered by user is in database or not
        //If "yes", then continue.
                if (!id) {
            return res.send({
                message:"query is not provided",
                success:false
            })
          }
        const checkname=await Locations.findOne({_id:id});

        if(!checkname){
            res.send({
                message:"Location not found in db. Add it to db first",
                success:false
            })
        }
        const realtime=axios.get(`http://api.weatherstack.com/current
        ? access_key = ${process.env.OPEN_WEATHER_MAP_API_KEY}
        & query = New York`);
        console.log(realtime);
        res.send({
            success:true,
            message:"Data searched success",
            data:realtime
            
                   })



    }catch(err)
    {
        
        res.send({
            message:err.message,
            success:false  //fase-->false
        })
    }
})





module.exports =router;