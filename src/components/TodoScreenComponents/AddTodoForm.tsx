import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {useAddTodo} from '../../hooks/todoHooks';
import {useFormik} from 'formik';
import * as yup from 'yup';

const AddTodoForm = () => {
  const [text, setText] = useState('');
  const {mutate, isLoading, isError, error} = useAddTodo();

  console.log('mutation======', isLoading, isError, error);

  const validationSchema = yup.object({
    name: yup.string().required('The name field is required.'),
  });

  const Formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: values => {
      console.log('formik data=====', values);
      const payload = {
        title: values?.name,
      };
      mutate(payload);
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputStyle}
        value={Formik?.values?.name}
        onChangeText={Formik?.handleChange('name')}
        onBlur={Formik?.handleBlur('name')}
      />
      {Formik.errors.name && Formik.touched.name && (
        <Text style={{color: 'red'}}>{Formik.errors.name}</Text>
      )}
      <Pressable onPress={Formik?.handleSubmit} style={styles.buttonStyle}>
        <Text style={styles.buttonLabelStyle}>Add +</Text>
      </Pressable>
    </View>
  );
};

export default AddTodoForm;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  inputStyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    borderRadius: 10,
  },
  buttonStyle: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 10,
  },
  buttonLabelStyle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
});
