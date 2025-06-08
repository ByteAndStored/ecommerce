import axios from "../libs/axios"; // 👈 Artık kendi ayarımızı kullanıyoruz
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

export default function Brands() {
  let [brands, setBrands] = useState([]);

  async function getBrands() {
    let { data } = await axios.get(`/brands`);
    setBrands(data.data);
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brands com</title>
      </Helmet>
      <div className="mx-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((ele) => (
          <BrandItem key={ele._id} ele={ele} />
        ))}
      </div>
    </div>
  );
}

function BrandItem({ ele }) {
  return (
    <div className="cursor-pointer bg-white p-4 rounded-lg shadow-md text-center transition duration-700 transform hover:shadow-lg hover:shadow-green-300 hover:scale-105">
      <img src={ele.image} className="w-full rounded-md" alt={ele.name} />
      <p className="text-green-500 text-md font-bold mt-3">{ele.name}</p>
    </div>
  );
}
