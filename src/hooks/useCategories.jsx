import { useQuery } from '@tanstack/react-query';
import axios from '../libs/axios';

export default function useCategories() {
  function getCategories() {
    return axios.get('/Category');
  }

  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    select: (data) => data?.data,
  });
}
