const express=require('express');
const path=require('path');
//importing express module
const app=express();
//creating instance of express 
const dbConfig=require('./config/dbcon');
const cors=require('cors')
//creating connection with database
const locationRoute=require('./routes/locationRoute')
const weatherRoute=require('./routes/weatherRoute')


const port =process.env.PORT || 5000;
app.use(express.json());


app.all('/*',function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
})
app.use(cors());

app.use(locationRoute);
app.use(weatherRoute);

const server=require("http").createServer(app);

server.listen(port ,()=>console.log(`Server is running on port${port}`));
