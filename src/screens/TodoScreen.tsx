import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useRecoilState} from 'recoil';
import {GetTodoList, todoListState} from '../hooks/todoHooks';
import {useNavigation} from '@react-navigation/native';
import AddButton from '../components/TodoScreenComponents/AddButton';
import TodoList from '../components/TodoScreenComponents/TodoList';
import CenterModal from '../components/ModalComponent/CenterModal';
import AddTodoForm from '../components/TodoScreenComponents/AddTodoForm';

const TodoScreen = () => {
  const navigation = useNavigation();
  const {isLoading, todoList, isError}: any = GetTodoList();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {!isLoading && todoList?.length > 0 && (
        <FlatList
          data={todoList}
          contentContainerStyle={{flexGrow: 1}}
          keyExtractor={(item, index) => item?.id?.toString()}
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
