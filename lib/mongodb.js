import mongoose from "mongoose";

const uri=process.env.MONGODB_URI;
if(!uri){ throw new Error("please check your db configuration !")}

let isconnected=false;

export async function connectedtoDB(){
   if(isconnected){ return console.log("already connected to db")}
   try{
     await mongoose.connect(uri,{dbName:"Test"});
    isconnected=true;
    console.log("connected to db");
   }catch(err){
         console.error(err);
         process.exit(1);
   }
} 