import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import React, {useState} from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';

import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query';
import {
  addTodoApi,
  deleteTodoApi,
  fetchTodoListApi,
  updateTodoApi,
} from '../quarys/todoQuery';
import {todoModalState, todoUpdateState} from '../recoils/todoStates';

export const useUpdateTodo = () => {
  const setUpdateUser = useSetRecoilState(todoUpdateState);
  const setIsModalVisible = useSetRecoilState(todoModalState);

  const updateTodo = (param: any) => {
    setUpdateUser(param);
    setIsModalVisible(true);
  };

  return {updateTodo};
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
    deleteMutation.mutate(payload);
  };
  return {deleteTodo};
};

export const GetTodoList = () => {
  //fetch todo list################################
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

  return {isLoading, todoList, isError};
};

const validationSchema = yup.object({
  name: yup.string().required('The name field is required.'),
  email: yup.string().email().required('The email field is required.'),
});

export const useForm = () => {
  const setIsModalVisible = useSetRecoilState(todoModalState);
  const [updateUser, setUpdateUser] = useRecoilState(todoUpdateState);
  const queryClient = useQueryClient();
  let updateData = {};

  if (updateUser != null) {
    updateData = {
      name: updateUser?.name,
      email: updateUser?.email,
    };
  }

  //update user function###################################

  const updateMutation = useMutation(updateTodoApi, {
    onSuccess: (data, variables, context) => {
      setIsModalVisible(false);
      setUpdateUser(null);
      queryClient.setQueriesData(['get_todo'], (oldData: any) => {
        let tempData: any = [];
        const updateData = {
          _id: data?.data?.id,
          name: data?.data?.name,
          email: data?.data?.email,
        };

        oldData?.map((item: any, index: any) => {
          if (item?._id != variables?.id) {
            tempData.push(item);
          } else {
            tempData.push(updateData);
          }
        });

        return tempData;
      });
    },
  });

  //#######################################################

  //add user function######################################
  const addMutation = useMutation(addTodoApi, {
    onSuccess: (data, variables, context) => {
      setIsModalVisible(false);
      queryClient.setQueriesData(['get_todo'], (oldData: any) => {
        const newData = {
          _id: data?.data?.id,
          name: data?.data?.name,
          email: data?.data?.email,
        };
        return [...oldData, newData];
      });
    },
  });
  //#########################################################
  const Formik = useFormik({
    initialValues: updateUser
      ? updateData
      : {
          name: '',
          email: '',
        },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async values => {
      let payload = {};
      if (updateUser != null) {
        payload = {
          name: values?.name,
          email: values?.email,
          id: updateUser?._id,
        };
        updateMutation.mutate(payload);
      } else {
        payload = {
          name: values?.name,
          email: values?.email,
        };
        addMutation.mutate(payload);
      }
    },
  });

  return {Formik, addMutation, updateMutation};
};
