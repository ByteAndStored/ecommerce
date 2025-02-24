import React from "react";
import ProductItem from "./ProductItem.jsx";
import Loading from "./Loading.jsx";
import useProduct from "../hooks/useProduct.jsx";
import { Helmet } from "react-helmet";

export default function FeaturedProduct() {

  let { data, isError, isLoading, error } = useProduct();

  if (isLoading) return <Loading></Loading>;

  if (isError) return <h2>{error.message}</h2>;

  return (
    <div className=" container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>FeaturedProduct com</title>
      </Helmet>
      <div className="flex flex-wrap">
        {data?.map((prod) => (
          <ProductItem key={prod?._id} prod={prod}></ProductItem>
        ))}
      </div>
    </div>
  );

}
