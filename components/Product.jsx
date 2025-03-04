"use client"
import Image from "next/image";
import { enTofa } from "../utils/utilities";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import Swal from 'sweetalert2';
import swal from "sweetalert"
import { useSession } from "next-auth/react"
const Product =  ({product}) => {
  let {addToCart}=useContext(CartContext);
  let{data:session}=useSession();
    return ( 
        <div className="product-wrapper">
            <Link href={`/products/${product._id}`} >
                <div className="product-image-box">
                    <Image src={product.image_url}  height={150}  width={150} alt="product"/>
                </div>
            </Link>
            
            <div className="product-info-box">
                <Link href={`/products/${product._id}`} >
                    <div className="product-title">{product.title}</div>
                </Link>
                <div className="product-price-row">
                    <button className="product-button" onClick={()=>{
                     if(session){
                        addToCart(product);Swal.fire({
                            title: "تبریک!",
                            icon: "success",
                            draggable: true,
                            text: "محصول به سبد خرید اضافه شد",
                          })}
                          else{
                            swal("لطفا ابتدا به سیستم وارد شوید !")
                          }
                     }
                    }>افزودن به سبد خرید</button>
                    <div className="product-price">{enTofa(product.price)} <small>افغانی</small></div>
                    
                </div>
            </div>

        </div>
     );
}
 
export default Product;