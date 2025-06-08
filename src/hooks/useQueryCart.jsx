import { useQuery } from '@tanstack/react-query';
import axios from '../libs/axios'; // kendi axios instance’ımızı çekiyoruz
import React from 'react';

export function getCarts() {
  let token = localStorage.getItem('token');
  return axios.get("/cart", {
    headers: {
      token,
    },
  });
}

export default function useQueryCart(fn) {
  return useQuery({
    queryKey: ['cart'],
    queryFn: fn,
    refetchOnWindowFocus: false,
  });
}
