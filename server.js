const express=require('express');
const path=require('path');
//importing express module
const app=express();
//creating instance of express 
const dbConfig=require('./config/dbcon');
const cors=require('cors')
//creating connection with database
const UserRouter=require('./routes/userRoute')
const ProductRouter=require('./routes/productRoute')
const cartRouter=require('./routes/cartRouter')
const ejs=require('ejs');
app.set('view engine', 'ejs');
app.use(express.static('public'));


const port =process.env.PORT || 5000;
app.use(express.json());


app.all('/*',function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
})
app.use(cors());

const server=require("http").createServer(app);
app.use(UserRouter);
//2 apis register and login
app.use(ProductRouter);
app.use(cartRouter);

//Starting the server with html file and info
app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname, "index.html"));
});


server.listen(port ,()=>console.log(`Server is running on port${port}`));
