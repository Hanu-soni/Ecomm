//let me make folder till then
//include express
const express=require('express');
const app=express();
const dbConfig=require('./config/dbcon');

const port =process.env.PORT || 5000;
app.use(express.json());


const server=require("http").createServer(app);


server.listen(port ,()=>console.log(`Server is running on port${port}`));
