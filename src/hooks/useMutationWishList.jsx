import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../libs/axios"; // ✅ merkezi axios importu
import React from "react";

// Token'ı her istekte çekiyoruz (çünkü localStorage anlık değişebilir)
function getAuthHeader() {
  const token = localStorage.getItem("token");
  return { headers: { token } };
}

// Add to wish list
export function addToWishlist(productId) {
  return axios.post("/wishlist", { productId }, getAuthHeader());
}

// Delete from wish list
export function deleteWishItem(productId) {
  return axios.delete(`/wishlist/${productId}`, getAuthHeader());
}

export default function useMutationWishList(fn) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishList"] });
    },
  });
}
