import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {todoListState} from '../hooks/todoHooks';
import {useRecoilState} from 'recoil';

const TodoListScreen = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);

  console.log('TodoListScreen list=======', todoList);

  return (
    <View style={styles.container}>
      <ScrollView>
        {todoList?.map(item => (
          <View style={styles.todoCard}>
            <Text style={styles.todoText}>{item?.data}</Text>
            <Text style={styles.deleteBtn}>delete</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TodoListScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  todoCard: {
    backgroundColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginBottom: 5,
  },
  todoText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  deleteBtn: {
    fontSize: 15,
    // fontWeight: 'bold',
    color: 'red',
    // marginBottom: 5,
    position: 'absolute',
    right: 10,
    top: 20,
  },
});
