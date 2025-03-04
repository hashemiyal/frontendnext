"use client"
import { useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import swal from "sweetalert";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
const LoginFormComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async(e) => {
      e.preventDefault();
      if(!email || !password){
        swal("لطفا ایمیل و پسورد خودرا وارد کنید !");
        return;
      }
     
            let res=await signIn("credentials",{
                email,password,
                redirect:false
               });
              if(res.error){Swal.fire("ایمیل و یا پسورد وارد شده درست نمیباشد !!");
                return;
              }
                swal("به سیستم وارد شدید!");
                redirect('/products')
        } 
     

    
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
          <h2 className="flex items-center justify-center">
            <Image src={"/images/logo.png"} width={50} height={50} alt="logo" />
          </h2>
          <h2 className="text-2xl font-bold text-center">وارد شدن کاربر</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                ایمیل
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                
                className=" w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                رمز
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                
                className=" w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="  w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-sky-700 focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              ورود
            </button>
          </form>
        </div>
      </div>
    );
}
 
export default LoginFormComponent;