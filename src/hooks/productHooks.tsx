import {
  useQuery,
  QueryClient,
  useQueryClient,
  QueryCache,
  useMutation,
} from '@tanstack/react-query';
import {fetchCartProducts, fetchProducts} from '../quarys/productQuery';

const demoData = {
  id: 3,
  price: 1234,
  rating: 4.0,
  title: 'samsung',
};

export const GetProducts = () => {
  const {isError, isLoading, isSuccess, data, error} = useQuery(
    ['getProducts'],
    fetchProducts,
    {staleTime: 60000, refetchOnMount: false, refetchOnWindowFocus: false},
  );

  return {isLoading, data, isError};
};

export const AddCartProduct = (item: any) => {
  console.log('add cart data========', item);
};
