import axios from 'axios';
import {useQuery, QueryClient} from '@tanstack/react-query';
import {getAxiosInstance} from '../apis/api';

const cartData: any = [];

export const fetchProducts = async () => {
  const api = await getAxiosInstance();
  try {
    const response = await api.get('products');
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCartProducts = (data: any) => {
  if (data) {
    return data;
  } else {
    return cartData;
  }
};
