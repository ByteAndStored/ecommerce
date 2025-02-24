import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import useProduct from "../hooks/useProduct";
import Loading from "./Loading";

export default function Categories() {
  let [cats, setCats] = useState([]);
  let { isLoading} = useProduct()

  async function getCat() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
      );
      setCats(data.data);
    }
    
    useEffect(() => {
      getCat();
    }, []);
    
    if (isLoading) return <Loading></Loading>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cats.map((ele) => (
          <CatItem key={ele._id} ele={ele} />
        ))}
      </div>
    </div>
  );
}

function CatItem({ ele }) {
  return (
    <div className="cursor-pointer bg-white p-4 rounded-lg shadow-md text-center transition duration-700 transform hover:shadow-lg hover:shadow-green-300 hover:scale-105">
     <Helmet>
        <meta charSet="utf-8" />
        <title>Categories com</title>
      </Helmet>
      <img src={ele.image} className="w-full h-80 object-cover rounded-md" alt={ele.name} />
      <p className="text-green-500 text-lg font-bold mt-3">{ele.name}</p>
    </div>
  );
}
