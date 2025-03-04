"use client"
import { useState } from "react";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
const RegisterFormComponent = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    let [error,seterror]=useState('');
   


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!formData.username || !formData.email || !formData.password){
            swal("وارد کردن تمام مشخصات لازمی میباشد !");
          return;
           }
            else{
             let response= await fetch("http://localhost:3000/api/user/register");
             let usersemail=await response.json();
             let existeduser=usersemail.find((email)=>{return email==formData.email});
             if(existeduser){
              Swal.fire("کاربر مورد نظر قبلا در سیستم موجود میباشد !");
              console.log(usersemail)
              return;
             }
         let res= await fetch("http://localhost:3000/api/user/register",{method:"POST",headers:{"Content-Type": "application/json",},body:JSON.stringify(formData)});
         if(res.ok){
            swal("کاربر ثبت شد !");
            let res=await signIn("credentials",{
                email:formData.email,password:formData.password,
                redirect:false
               });
            redirect('/products')  
         }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">ثبت کاربر</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">اسم کاربری</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">ایمیل</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">رمز</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            ثبت
          </button>
        </form>
      </div>
    </div>
    );


}
 
export default RegisterFormComponent;