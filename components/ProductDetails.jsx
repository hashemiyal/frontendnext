"use client"
import Link from "next/link";
import { CartContext } from "../contexts/CartContext";
import { enTofa } from "../utils/utilities";
import { useContext } from "react";
import Swal from 'sweetalert2'
import swal from "sweetalert";
import { useSession } from "next-auth/react"

const ProductDetailsComponent = ({product}) => {
    let {data:session}=useSession();
    const{addToCart}=useContext(CartContext);
    return ( 
        <div className="product-detail">
        <div className="product-detail-content">
            <div className="new-product-image">
                <img src={product.image_url} alt={product.title} />
            </div>

            <div className="new-product-info">
                <h1 className="new-product-title">{product.title}</h1>
                <span>دسته بندی: </span>
                <Link href={`/products?category=${product.category}`}>{product.category}</Link>
                <br/><br/>
                <p className="new-product-description">{product.description}</p>
                <div className="product-price-row">
                    <div className="product-price">{enTofa(product.price) }</div>
                    <button className="product-button" onClick={()=>{
                        if(session){
                            addToCart(product);
                            Swal.fire({
                                title: "تبریک!",
                                icon: "success",
                                text: "محصول به سبد خرید اضافه شد",
                              });
                        }
                        else{
                          swal("لطفا ابتدا به سیستم وارد شوید !")
                        }
                       }}>
                        افزودن به سبد خرید
                    </button>
            </div>
            </div>
        </div>
    </div>
    )
}
 
export default ProductDetailsComponent;