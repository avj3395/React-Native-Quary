import {getAxiosInstance} from '../apis/api';

export const fetchTodoListApi = async () => {
  const api = await getAxiosInstance();
  try {
    const response = await api.get('get-user');
    return response?.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const addTodoApi = async (data: any) => {
  const api = await getAxiosInstance();
  try {
    const response = await api.post('add-user', data);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodoApi = async (data: any) => {
  const api = await getAxiosInstance();
  try {
    const response = await api.post('delete-user', data);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateTodoApi = async (data: any) => {
  const api = await getAxiosInstance();
  try {
    const response = await api.put('update-user', data);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
