import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import { RootStackParamList } from './types';
import { ROUTE } from './routes';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTE.Login} component={LoginScreen} />
      <Stack.Screen name={ROUTE.SignUp} component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
