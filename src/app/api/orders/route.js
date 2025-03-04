import { NextResponse } from "next/server";
import { connectedtoDB } from "../../../../lib/mongodb";
import Order from "../../../../models/Order";
export  async function POST(req){
    try{
        await connectedtoDB();
        const {user,cart,totalPrice} = await req.json()

        const newOrder = new Order({
            user,
            cart,
            totalPrice,
            status: "pending",
            createAt: new Date()
        })
        await newOrder.save()
        return NextResponse.json({"message":"سفارش شما موفقانه ثبت گردید !"},{status:200});
     
    }catch(err){
        return NextResponse.json({message:"خطا در ثبت سفارش"}, {status:500})

    }






}