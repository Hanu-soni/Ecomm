//here , I will be writing the db connection 

const mongoose=require('mongoose');
const dotenv=require('dotenv');

require('dotenv').config();


const dbURL=process.env.Mongodb;


mongoose.connect(dbURL, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   bufferCommands: true, // Set this to true to enable buffering
  bufferMaxEntries: 0,   // Set the maximum number of entries in the buffer
  connectTimeoutMS: 30000, // Set the connection timeout
 }).then(()=>{
    console.log("connected to db")
 }).catch(error=>{
    console.log(error);
 })
//paused the video as i was entering password. I WILL CHANGE PASSWORD FOR SECURITY


