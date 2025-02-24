import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import useMutationCart, { addToCart } from "../hooks/useMutationCart";
import useMutationWishList, { addToWishlist, deleteWishItem } from "../hooks/useMutationWishList";
import useQueryWishlist, { getWishlist } from "../hooks/useQueryWishlist";

export default function ProductItem({ prod }) {
  let { imageCover, id, title, price, category, ratingsAverage, priceAfterDiscount } = prod;

  let { data, mutate, error, isError, isSuccess } = useMutationCart(addToCart);
  let { data: wishData, mutate: wishMutate, error: wishError, isError: isWishError, isSuccess: isWishSuccess } = useMutationWishList(addToWishlist);
  let { mutate: deleteMutate } = useMutationWishList(deleteWishItem);
  let { data: wishlistData } = useQueryWishlist(getWishlist);

  // Track if the product is in the wishlist
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (wishlistData?.data?.data) {
      const inWishlist = wishlistData.data.data.some(item => item._id === id);
      setIsFavorite(inWishlist);
    }
  }, [wishlistData, id]);

  // Handle wishlist toggle
  function handleWishlist() {
    if (isFavorite) {
      deleteMutate(id);
      toast.success("Removed from wishlist");
    } else {
      wishMutate(id);
      toast.success("Added to wishlist");
    }
    setIsFavorite(!isFavorite);
  }

  // Show toast messages
  if (isSuccess) toast.success(data?.data?.message);
  // if (isWishSuccess) toast.success(wishData?.data?.message);
  if (isError) toast.error(error?.response?.data?.message);
  if (isWishError) toast.error(wishError?.response?.data?.message);

  return (
    <div className="product cursor-pointer lg:w-1/8 md:w-1/4 sm:w-1/2 w-full p-3">
      <Link to={`/productdetails/${id}/${category._id}`}>
        <img src={imageCover} className="w-full" alt="Product" />
        <p className="text-green-color text-sm font-bold">{category.name}</p>
        <p>{title}</p>
        <div className="flex justify-between my-3">
          <div>
            <p className={priceAfterDiscount ? "line-through" : ""}>{price} EGP</p>
            <p>{priceAfterDiscount ? priceAfterDiscount + " EGP" : ""} </p>
          </div>
          <div>
            <span>
              {ratingsAverage}
              <i className="fa-solid fa-star text-rating-color"></i>
            </span>
          </div>
        </div>
      </Link>
      <div className="flex justify-between">
        <button onClick={() => mutate(id)} className="btn text-white bg-green-500 p-3 rounded-md">
          Add to Cart
        </button>
        <button onClick={handleWishlist} className="btn text-black">
          <i className={`fa-heart fa-lg ${isFavorite ? "fa-solid text-red-600" : "fa-regular"}`}></i>
        </button>
      </div>
    </div>
  );
}
