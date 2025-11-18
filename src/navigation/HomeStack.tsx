import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { ROUTE } from './routes';
import { RootStackParamList } from './types';

import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={ROUTE.Home}
        component={HomeScreen}
      />
     
    </Stack.Navigator>
  );
};

export default HomeStack;
