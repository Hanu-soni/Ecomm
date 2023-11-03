//here , I will be writing the db connection 

const mongoose=require('mongoose');
const dotenv=require('dotenv');

require('dotenv').config();


const dbURL=process.env.Mongodb;


mongoose.connect(dbURL, {
   useNewUrlParser: true,
   useUnifiedTopology: true
 }).then(()=>{
    console.log("connected to db")
 }).catch(error=>{
    console.log(error);
 })
//paused the video as i was entering password. I WILL CHANGE PASSWORD FOR SECURITY


