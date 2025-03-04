import LatestProducts from "../../../components/LatestProducts";
const Products = async ({searchParams}) => {
    let url;
    let {category} = await searchParams
    category
      ? (url = `http://localhost:3000/api/products?category=${category}`)
      : (url = `http://localhost:3000/api/products`);
    const res = await fetch(url);
    const products = await res.json();
    return ( <LatestProducts products={products} category={category}/> );
}
 
export default Products;