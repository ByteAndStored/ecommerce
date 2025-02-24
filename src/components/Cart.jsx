import React, { useContext, useState } from "react";
import useMutationCart, {
  clearCart,
  deleteItem,
  updateCount,
} from "../hooks/useMutationCart";
import useQueryCart, { getCarts } from "../hooks/useQueryCart";
import Loading from "./Loading";
import img from "../assets/images/oc-empty-cart.svg";
import Payment from "./Payment";
import { numItem } from "../Context/NumberCartContext";
import { Helmet } from "react-helmet";



export default function Cart() {

  let {setCartNum} = useContext(numItem)
  let { data, isError, error, isLoading } = useQueryCart(getCarts);
  let { mutate, isPending } = useMutationCart(deleteItem);
  let { mutate: mutateClear, isPending: isPendingClear } =
    useMutationCart(clearCart);
  let { mutate: mutateUpdate, isPending: isPendingUpdate } =
    useMutationCart(updateCount);
  let [isOpen,setOpen]= useState(false)

  if (!data?.data?.numOfCartItems) {
    return (
      <div className=" flex justify-center items-center h-screen">
        <img src={img} alt="" />
      </div>
    );
  }

  setCartNum(data?.data?.numOfCartItems)

  if (isLoading || isPending || isPendingClear||isPendingUpdate) {
    return <Loading></Loading>;
  }

  return (
    <div className="w-3/4 mx-auto my-5 relative overflow-x-auto sm:rounded-lg">
      {/* <Helmet>
        <meta charSet="utf-8" />
        <title>Cart com</title>
      </Helmet> */}
      <h1 className=" font-bold my-8">
        Number of cart item: {data?.data?.numOfCartItems}
      </h1>
      <h2 className=" font-bold my-8">
        <span className=" text-green-color">
          The total price: {data?.data?.data?.totalCartPrice} EGP
        </span>
      </h2>

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
              Qty
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
          {data?.data?.data?.products.map((prod) => (
            <tr
              key={prod?.prduct?._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="p-4">
                <img
                  src={prod?.product?.imageCover}
                  className="w-16 md:w-32 max-w-full max-h-full"
                  alt="Apple Watch"
                />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {prod?.product?.title}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <button
                    onClick={()=>{mutateUpdate({productId:prod?.product?._id,count:prod?.count-1})}}
                    className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                  >
                    <span className="sr-only">Quantity button</span>
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 2"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M1 1h16"
                      />
                    </svg>
                  </button>
                  <div>
                    <input
                      type='text'
                      disabled
                      id="first_product"
                      className="bg-gray-50 w-14 text-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={prod?.count}
                      required
                    />
                  </div>
                  <button
                    onClick={()=>{mutateUpdate({productId:prod?.product?._id,count:prod?.count+1})}}
                    className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                  >
                    <span className="sr-only">Quantity button</span>
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {prod?.price} EGP
              </td>
              <td className="px-6 py-4">
                <a
                  className="font-medium cursor-pointer text-white bg-red-600 rounded-md p-2 dark:text-red-500 hover:underline"
                  onClick={() => {
                    mutate(prod?.product?._id);
                  }}
                >
                  Remove<i className="fa-solid fa-trash"></i>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className=" bg-green-color p-4 my-10 float-right cursor-pointer rounded-lg"
        onClick={mutateClear}
      >
        clear cart
      </button>
      <br />
      <br />
      <button
        className=" bg-green-color p-4 my-10 cursor-pointer rounded-lg"
        onClick={()=>{setOpen(!isOpen)}}
      >
        Pay online
      </button>
      {isOpen&&<Payment cartId={data?.data?.cartId}></Payment>}
      


    </div>
  );
}
