import {useQuery, QueryClient} from '@tanstack/react-query';
import {fetchProducts} from '../quarys/productQuery';

export const GetProducts = () => {
  const {isError, isLoading, isSuccess, data, error} = useQuery(
    ['getProducts'],
    fetchProducts,
    {staleTime: 60000},
  );
  return {isLoading, data, isError};
};
