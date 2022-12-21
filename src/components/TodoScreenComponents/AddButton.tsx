import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const AddButton = ({openModal}: any) => {
  return (
    <Pressable onPress={() => openModal()} style={styles.container}>
      <Text style={styles.textStyle}>+</Text>
    </Pressable>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#de2635',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    position: 'absolute',
    right: 20,
    bottom: 30,
  },
  textStyle: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
});
