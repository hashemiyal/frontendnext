import Product from "../../../../../models/Product";
import { connectedtoDB } from "../../../../../lib/mongodb";
import { NextResponse } from "next/server";
export async function GET(req,{params}){
    
    try{
        const {id} = await params;
        await connectedtoDB();
        let product = await Product.findOne({_id:id});
    //    let product=products.find((pr)=>{return pr._id==id})    my own method 
          return NextResponse.json(product,{status:200});

    }
    catch(err){
        return NextResponse.json({error: "خطا در دریافت محصولات"}, {status:500})
    }

}