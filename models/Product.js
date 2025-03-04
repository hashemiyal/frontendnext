import mongoose from "mongoose";

const ProductSchema=new mongoose.Schema({
    title:String,
    price:Number,
    image_url:String,
    brand:String,
    stock:Number,
    description:String,
    category:String,
    rating:Number

});

export default mongoose.models.Product || mongoose.model("Product",ProductSchema);