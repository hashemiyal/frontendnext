
import { NextResponse } from "next/server";
import { connectedtoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/User";
import bcrypt from "bcryptjs";
export async function POST(request){
    try{
        await connectedtoDB();  
           let {username,email,password}= await request.json();
                let hashedpassword= await bcrypt.hash(password,10)
                let user={username,email,password:hashedpassword,isAdmin:false}
                 await User.create(user);
            return NextResponse.json({"message":"user registerd!"},{status:201});

    }
    catch(err){
        return NextResponse.json({error: "server error"}, {status:500})
    }
}
export async function GET(request){
    try{
            await connectedtoDB();  
             let users= await User.find({});
           let usersemail= users.map((user)=>{return user.email});
            return NextResponse.json(usersemail,{status:201});

    }
    catch(err){
        return NextResponse.json({error: "server error"}, {status:500})
    }
}