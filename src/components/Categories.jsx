import React from "react";
import { Helmet } from "react-helmet";
import useCategories from "../hooks/useCategories";
import Loading from "./Loading";

export default function Categories() {
  const { data: cats, isLoading } = useCategories();

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cats?.map((ele) => (
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
