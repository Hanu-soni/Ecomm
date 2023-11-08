const express=require('express');
//importing express module
const app=express();
//creating instance of express 
const dbConfig=require('./config/dbcon');
//creating connection with database
const UserRouter=require('./routes/userRoute')
const ProductRouter=require('./routes/productRoute')
const cartRouter=require('./routes/cartRouter')

const port =process.env.PORT || 5000;
app.use(express.json());
//connect to database

const server=require("http").createServer(app);
app.use(UserRouter);
//2 apis register and login
app.use(ProductRouter);
app.use(cartRouter);


server.listen(port ,()=>console.log(`Server is running on port${port}`));
