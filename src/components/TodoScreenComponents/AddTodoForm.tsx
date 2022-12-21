import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {useForm} from '../../hooks/todoHooks';

const AddTodoForm = () => {
  const {Formik, addMutation, updateMutation}: any = useForm();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputStyle}
        value={Formik?.values?.name}
        onChangeText={Formik?.handleChange('name')}
        onBlur={Formik?.handleBlur('name')}
        placeholder="name"
      />
      {Formik.errors.name && Formik.touched.name && (
        <Text style={{color: 'red'}}>{Formik.errors.name}</Text>
      )}
      <TextInput
        style={styles.inputStyle}
        value={Formik?.values?.email}
        onChangeText={Formik?.handleChange('email')}
        onBlur={Formik?.handleBlur('email')}
        placeholder="email"
      />
      {Formik.errors.email && Formik.touched.email && (
        <Text style={{color: 'red'}}>{Formik.errors.email}</Text>
      )}
      <Pressable onPress={Formik?.handleSubmit} style={styles.buttonStyle}>
        <Text style={styles.buttonLabelStyle}>
          {addMutation.isLoading || updateMutation.isLoading
            ? 'Loading...'
            : 'Add +'}
        </Text>
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
    marginVertical: 10,
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
