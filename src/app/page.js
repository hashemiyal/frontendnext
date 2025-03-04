import HeroSection from "../../components/Herosection";
import LatestProducts from "../../components/LatestProducts";
export default async function Home({searchParams}) {
  let url;
  let {category} =  await searchParams;
  category
    ? (url = `http://localhost:3000/api/products?category=${category}`)
    : (url = `http://localhost:3000/api/products`);
  const res = await fetch(url);
  const products = await res.json();
  return (
    <>
       <HeroSection/>
       <LatestProducts products={products} category={category}/>
    </>
  );
}
