import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../libs/axios"; // ✅ merkezi yapı
import React from "react";

// Dinamik token çekme fonksiyonu
function getAuthHeader() {
  const token = localStorage.getItem("token");
  return { headers: { token } };
}

// Add to cart
export function addToCart(productId) {
  return axios.post("/cart", { productId }, getAuthHeader());
}

// Delete item from cart
export function deleteaItem(productId) {
  return axios.delete(`/cart/${productId}`, getAuthHeader());
}

// Update item count
export function updateCount({ productId, count }) {
  return axios.put(`/cart/${productId}`, { count }, getAuthHeader());
}

// Clear all cart
export function clearCart() {
  return axios.delete(`/cart`, getAuthHeader());
}

export default function useMutationCart(fn) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
