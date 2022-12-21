import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TodoScreen from '../screens/TodoScreen';

const Stack = createNativeStackNavigator();

const Index = () => {
  return (
    <React.Fragment>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Todo'}>
        <Stack.Screen name="Todo" component={TodoScreen} />
      </Stack.Navigator>
    </React.Fragment>
  );
};

export default Index;
