import {atom} from 'recoil';
import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query';
import {addTodoApi, fetchTodoListApi} from '../quarys/todoQuery';

export const todoListState = atom({
  key: 'todoList',
  default: [],
});

export const UpdateTodo = (ID: any) => {
  console.log('UpdateTodo======', ID);
};

export const DeleteTodo = (ID: any) => {
  console.log('DeleteTodo======', ID);
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  return useMutation(addTodoApi, {
    onSuccess: (data, variables, context) => {
      // refetch todo list
      queryClient.invalidateQueries('get_todo');
      console.log('useMutation=====onSuccess======', data);
    },
  });
};

export const GetTodoList = () => {
  const {
    isError,
    isLoading,
    isSuccess,
    data: todoList,
    error,
  } = useQuery(['get_todo'], fetchTodoListApi, {
    staleTime: 60000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  console.log('GetTodoList=======', isLoading, todoList);

  return {isLoading, todoList, isError};
};
