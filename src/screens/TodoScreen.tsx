import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import {useRecoilState} from 'recoil';
import {GetTodoList, todoModalState} from '../hooks/todoHooks';
import {useNavigation} from '@react-navigation/native';
import AddButton from '../components/TodoScreenComponents/AddButton';
import TodoList from '../components/TodoScreenComponents/TodoList';
import CenterModal from '../components/ModalComponent/CenterModal';
import AddTodoForm from '../components/TodoScreenComponents/AddTodoForm';

const TodoScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useRecoilState(todoModalState);
  const {isLoading, todoList, isError}: any = GetTodoList();

  return (
    <View style={styles.container}>
      {!isLoading && todoList?.length > 0 && (
        <FlatList
          data={todoList}
          contentContainerStyle={{flexGrow: 1}}
          keyExtractor={(item, index) => item?._id?.toString()}
          renderItem={({item, index}: any) => <TodoList item={item} />}
        />
      )}
      <AddButton openModal={setIsModalVisible} />
      {isModalVisible && (
        <CenterModal
          modalVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}>
          <AddTodoForm />
        </CenterModal>
      )}
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
