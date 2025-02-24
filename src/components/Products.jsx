import React from "react";
import { Helmet } from "react-helmet";
import useProduct from "../hooks/useProduct";
import Loading from "./Loading";
import ProductItem from "./ProductItem";


export default function Products() {
 
  let {data, isError, isLoading, error} = useProduct()

  if (isLoading) return <Loading></Loading>;

  if (isError) return <h2>{error.message}</h2>;

  return (
    <div className=" container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products com</title>
      </Helmet>
      <div className="flex flex-wrap">
        {data?.map((prod) => (
          <ProductItem key={prod?._id} prod={prod}></ProductItem>
        ))}
      </div>
    </div>
  );
} 
