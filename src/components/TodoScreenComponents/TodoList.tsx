import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {DeleteTodo, UpdateTodo} from '../../hooks/todoHooks';

const TodoList = ({item}: any) => {
  return (
    <View style={styles.todoCard}>
      <Text style={styles.todoText}>{item?.title}</Text>
      <View style={styles.actionStyle}>
        <Text
          onPress={() => UpdateTodo(item?.id)}
          style={[styles.deleteBtn, {color: '#d537ed'}]}>
          Update
        </Text>
        <Text onPress={() => DeleteTodo(item?.id)} style={styles.deleteBtn}>
          delete
        </Text>
      </View>
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  container: {
    // padding: 20,
    // flex: 1,
  },
  todoCard: {
    backgroundColor: '#75b3f0',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  todoText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    flex: 1,
  },
  actionStyle: {
    flexDirection: 'row',
  },
  deleteBtn: {
    fontSize: 15,
    // fontWeight: 'bold',
    color: 'red',
    marginRight: 10,
  },
});
