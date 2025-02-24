import React, { useContext, useState } from "react";
import Loading from "./Loading";
import img from "../assets/images/no_wish_list.png";
import { numItem } from "../Context/NumberCartContext";
import useMutationWishList, { deleteWishItem } from "../hooks/useMutationWishList";
import useQueryWishlist, { getWishlist } from "../hooks/useQueryWishlist";



export default function WishList() {

  let {setCartNum} = useContext(numItem)
  let { data, isError, error, isLoading } = useQueryWishlist(getWishlist);
  let { mutate, isPending } = useMutationWishList(deleteWishItem);
  let [isOpen,setOpen]= useState(false)
  console.log(data);

  if (!data?.data?.count) {
    return (
      <div className=" flex justify-center items-center h-screen">
        <img src={img} alt="" />
      </div>
    );
  }

  setCartNum(data?.data?.count)

  if (isLoading || isPending) {
    return <Loading></Loading>;
  }
  if (isError) return <h2>{error.message}</h2>;


  return (
    <div className="w-3/4 mx-auto my-5 relative overflow-x-auto sm:rounded-lg">
      <table className="w-full shadow-lg my-3 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.data?.map((prod) => (
            <tr
              key={prod?._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="p-4">
                <img
                  src={prod?.imageCover}
                  className="w-16 md:w-32 max-w-full max-h-full"
                  alt="Apple Watch"
                />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {prod?.title}
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {prod?.price} EGP
              </td>
              <td className="px-6 py-4">
                <a
                  className="font-medium cursor-pointer text-white bg-red-600 rounded-md p-2 dark:text-red-500 hover:underline"
                  onClick={() => {
                    mutate(prod?._id);
                  }}
                >
                  Remove<i className="fa-solid fa-trash"></i>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}
