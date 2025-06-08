import React from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import useMutationCart, { addToCart } from "../hooks/useMutationCart";

export default function ProductItem({ prod }) {
  let { imageCover, id, title, price, ratingsAverage } = prod;

  let { data, mutate, error, isError, isSuccess } = useMutationCart(addToCart);

  if (isSuccess) toast.success(data?.data?.message);
  if (isError) toast.error(error?.response?.data?.message);

  return (
    <div className="product cursor-pointer lg:w-1/8 md:w-1/4 sm:w-1/2 w-full p-3">
      <Link to={`/productdetails/${id}`}>
        <img src={imageCover} className="w-full" alt="Product" />
        <p>{title}</p>
        <div className="flex justify-between my-3">
          <div>
            <p>{price} EGP</p>
          </div>
          <div>
            <span>
              {ratingsAverage}
              <i className="fa-solid fa-star text-yellow-500"></i>
            </span>
          </div>
        </div>
      </Link>
      <div className="flex justify-between">
        <button onClick={() => mutate(id)} className="btn text-white bg-green-500 p-3 rounded-md">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
