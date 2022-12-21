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
import {GetTodoList} from '../hooks/todoHooks';
import {useNavigation} from '@react-navigation/native';
import AddButton from '../components/TodoScreenComponents/AddButton';
import TodoList from '../components/TodoScreenComponents/TodoList';
import CenterModal from '../components/ModalComponent/CenterModal';
import AddTodoForm from '../components/TodoScreenComponents/AddTodoForm';
import {todoModalState} from '../recoils/todoStates';
import LoadingComponent from '../components/LoadingComponent/LoadingComponent';

const TodoScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useRecoilState(todoModalState);
  const {isLoading, todoList, isError}: any = GetTodoList();

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <LoadingComponent />
        </View>
      )}
      {!isLoading && todoList?.length > 0 && (
        <FlatList
          data={todoList}
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
