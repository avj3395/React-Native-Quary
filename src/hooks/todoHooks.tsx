import {atom, useSetRecoilState} from 'recoil';
import React, {useState} from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';

import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query';
import {addTodoApi, fetchTodoListApi} from '../quarys/todoQuery';

export const todoModalState = atom({
  key: 'todoModal',
  default: false,
});

export const UpdateTodo = (ID: any) => {
  console.log('UpdateTodo======', ID);
};

export const DeleteTodo = (ID: any) => {
  console.log('DeleteTodo======', ID);
};

// export const useAddTodo = (payload: any) => {
// const queryClient = useQueryClient();
// const mutation = useMutation(addTodoApi, {
//   onSuccess: (data, variables, context) => {
// refetch todo list
// queryClient.invalidateQueries('get_todo');
// console.log('useMutation=====onSuccess======', payload);
// useTodoState().setIsModalVisible(false);
//   },
// });
// mutation.mutate(payload);
// };

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

const validationSchema = yup.object({
  name: yup.string().required('The name field is required.'),
  email: yup.string().email().required('The email field is required.'),
});

export const useForm = () => {
  const setIsModalVisible = useSetRecoilState(todoModalState);
  const queryClient = useQueryClient();

  const mutation = useMutation(addTodoApi, {
    onSuccess: (data, variables, context) => {
      //refetch todo list
      queryClient.invalidateQueries('get_todo');
      console.log('useMutation=====onSuccess======', data);
      setIsModalVisible(false);
    },
  });

  const Formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    validationSchema,
    onSubmit: async values => {
      const payload = {
        name: values?.name,
        email: values?.email,
      };
      console.log('formik data=====', payload);
      mutation.mutate(payload);
    },
  });

  return {Formik, mutation};
};
