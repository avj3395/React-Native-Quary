import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import TodoScreen from '../screens/TodoScreen';
import TodoListScreen from '../screens/TodoListScreen';

const Stack = createNativeStackNavigator();

const Index = () => {
  return (
    <React.Fragment>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Todo'}>
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        <Stack.Screen name="Todo" component={TodoScreen} />
        {/* <Stack.Screen name="TodoList" component={TodoListScreen} /> */}
      </Stack.Navigator>
    </React.Fragment>
  );
};

export default Index;
