import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

let token = localStorage.getItem('token');

// add to wish list
export function addToWishlist(productId) {
  return axios.post(
    `https://ecommerce.routemisr.com/api/v1/wishlist`,
    { productId },
    {
      headers: {
        token
      }
    }
  )
  
}

// delete item from wish list
export function deleteWishItem(productId) {
  return axios.delete(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
    {
      headers: {
        token
      }
    }
  )
  
}

  



export default function useMutationWishList(fn) {

  const queryClient = useQueryClient()


  return useMutation({ mutationFn:fn ,onSuccess:()=>{
    queryClient.invalidateQueries({ queryKey: ['wishList'] })
  }});
}
