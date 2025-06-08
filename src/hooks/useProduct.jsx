import { useQuery } from '@tanstack/react-query';
import axios from '../libs/axios';

export default function useProduct() {
  function getProducts() {
    return axios.get('/product');
  }

  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    select: (data) => data?.data,
  });
}
