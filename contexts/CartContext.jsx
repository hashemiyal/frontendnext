"use client"
import {createContext} from 'react';
import { useState,useEffect } from 'react';
export const CartContext=createContext();

export default function CartContextProvider({children}){
    
 let [cart,setCart]=useState([]);
 useEffect(
    ()=>{
        const cartlocal = JSON.parse(localStorage.getItem("cart")) 
        if(cartlocal){
            setCart(cartlocal)
        }
    }
    , [])

useEffect(
    ()=>{
        localStorage.setItem("cart", JSON.stringify(cart))
    }
    , [cart])
 function addToCart(product){ 
    setCart((prev)=>{
       let selectedproduct=prev.find((item)=>item._id==product._id);
       if(!selectedproduct){
           return [...prev,{...product,quantity:1}]
       }else{
              return prev.map((item)=>item._id==product._id?{...item,quantity:item.quantity+1}:item)
       }

    }) 
 
 }

    function removeFromCart(id){
        setCart((prev)=>prev.filter((item)=>item._id!==id))

    }

    function updateQuantity(id,quantity){
        setCart((prev)=>prev.map((item)=>item._id===id?{...item,quantity}:item))
    }

    function clearCart(){
        setCart([]);
    }


    return (
        <CartContext.Provider value={{cart,addToCart,removeFromCart,updateQuantity,clearCart}}>
            {children}
        </CartContext.Provider>
    )
}