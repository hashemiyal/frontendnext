import { NextResponse } from "next/server";
import { connectedtoDB } from "../../../../lib/mongodb";
import Product from "../../../../models/Product";


export async function GET(request){
    try{
        await connectedtoDB();
        let {searchParams}=new URL(request.url);

        let category=searchParams.get("category");
        let products;
        if(category){
        products=await Product.find({category:category});
        }else{
            products=await Product.find({});
        }
        return NextResponse.json(products,{status:200});

    }
    catch(err){
        return NextResponse.json({error: "خطا در دریافت محصولات"}, {status:500})
    }
}