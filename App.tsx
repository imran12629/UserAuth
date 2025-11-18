import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FlashMessage from 'react-native-flash-message';

const App = () => {

  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <AuthProvider>
      <AppNavigator />
      <FlashMessage position="top" />
    </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default App;
