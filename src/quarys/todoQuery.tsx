import {getAxiosInstance} from '../apis/api';
import {useQuery, QueryClient} from '@tanstack/react-query';

export const fetchTodoListApi = async () => {
  console.log('fetchTodoListApi========');
  const api = await getAxiosInstance();
  try {
    const response = await api.get('products');
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const addTodoApi = async (data: any) => {
  console.log('addTodoApi========', data);
  const api = await getAxiosInstance();
  try {
    const response = await api.post('products', data);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
