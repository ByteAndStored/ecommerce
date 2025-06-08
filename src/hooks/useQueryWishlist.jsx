import { useQuery } from '@tanstack/react-query'
import axios from '../libs/axios'  // kendi axios instance’ımızı çağırıyoruz

export function getWishlist() {
  return axios.get(`/wishlist`);
}

export default function useQueryWishlist(fn = getWishlist) {
  return useQuery({
    queryKey: ['wishList'],
    queryFn: fn,
    refetchOnWindowFocus: false
  });
}
