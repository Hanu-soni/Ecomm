//here , I will be writing the db connection 

const mongoose=require('mongoose');
const dotenv=require('dotenv');

require('dotenv').config();


const dbURL=process.env.Mongodb;
console.log(dbURL)


mongoose.connect(dbURL, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   bufferCommands: false, // Set this to true to enable buffering
     // Set the maximum number of entries in the buffer
  connectTimeoutMS: 100000, // Set the connection timeout
 }).then(()=>{
    console.log("connected to PANKAJDB")
 }).catch(error=>{
    console.log(error);
 })
//paused the video as i was entering password. I WILL CHANGE PASSWORD FOR SECURITY


