import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

const Index = () => {
  return (
    <React.Fragment>
      <Stack.Navigator
       screenOptions={{
        headerShown: false,
       }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </React.Fragment>
  );
};

export default Index;
