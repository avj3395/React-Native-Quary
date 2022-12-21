import {getAxiosInstance} from '../apis/api';
import {useQuery, QueryClient} from '@tanstack/react-query';

export const fetchTodoListApi = async () => {
  console.log('fetchTodoListApi========');
  const api = await getAxiosInstance();
  try {
    const response = await api.get('get-user');
    return response?.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const addTodoApi = async (data: any) => {
  console.log('addTodoApi========', data);
  const api = await getAxiosInstance();
  try {
    const response = await api.post('add-user', data);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodoApi = async (data: any) => {
  console.log('deleteTodoApi========', data);
  const api = await getAxiosInstance();
  try {
    const response = await api.post('delete-user', data);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
