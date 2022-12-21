import {atom, useSetRecoilState} from 'recoil';
import React, {useState} from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';

import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query';
import {addTodoApi, deleteTodoApi, fetchTodoListApi} from '../quarys/todoQuery';
import {todoModalState} from '../recoils/todoStates';

export const UpdateTodo = (ID: any) => {
  console.log('UpdateTodo======', ID);
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(deleteTodoApi, {
    onSuccess: (data, variables, context) => {
      //after delete state update.........
      queryClient.setQueriesData(['get_todo'], (oldData: any) => {
        let newData: any = [];
        oldData?.map((item: any, index: any) => {
          if (item?._id != variables?.id) {
            newData.push(item);
          }
        });

        return newData;
      });
    },
  });

  const deleteTodo = (ID: any) => {
    const payload = {
      id: ID,
    };

    console.log('deleteTodo=======', payload, typeof ID);
    deleteMutation.mutate(payload);
  };
  return {deleteTodo};
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
  // todoList?.reverse();
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

  const addMutation = useMutation(addTodoApi, {
    onSuccess: (data, variables, context) => {
      //refetch todo list
      // queryClient.invalidateQueries(['get_todo']);
      console.log('useMutation=====onSuccess======', data);
      setIsModalVisible(false);
      queryClient.setQueriesData(['get_todo'], (oldData: any) => {
        console.log('oldData========', oldData);
        const newData = {
          _id: data?.data?.id,
          name: data?.data?.name,
          email: data?.data?.email,
        };
        return [...oldData, newData];
      });
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
      addMutation.mutate(payload);
    },
  });

  return {Formik, addMutation};
};
