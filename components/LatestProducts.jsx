"use client"
import ProductList from "./ProductList";
import { Suspense } from "react";
const LatestProducts = ({products,category}) => {
    return (
      <div className="new-products">
        {!category ? (
          <h2 className="title">{"محصولات پر فروش"}</h2>
        ) : (
          <h2 className="title">{`محصولات پر فروش از کتگوری : ${category}`}</h2>
        )}
        {products.length > 0 ? (
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-screen">
                <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
              </div>
            }
          >
            <ProductList products={products} />
          </Suspense>
        ) : (
          <div className="title-second"> محصولی یافت نشد !</div>
        )}
      </div>
    );

};

export default LatestProducts;