
import ProductDetailsComponent from "../../../../components/ProductDetails";
const ProductDetails = async ({params}) => {
    const {id}= await params;
    const res=await fetch("http://localhost:3000/api/products/"+id);
    let product=await res.json();
    return ( 
        <ProductDetailsComponent product={product}/>
     );
}
 
export default ProductDetails;