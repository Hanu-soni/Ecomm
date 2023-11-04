const express=require('express');
const app=express();
const dbConfig=require('./config/dbcon');
const Product=require('./models/Product');
const Order=require('./models/Orders');
const User=require('./models/Users');
const UserRouter=require('./routes/userRoute')

const port =process.env.PORT || 5000;
app.use(express.json());
//connect to database

const server=require("http").createServer(app);
app.use(UserRouter)


server.listen(port ,()=>console.log(`Server is running on port${port}`));
