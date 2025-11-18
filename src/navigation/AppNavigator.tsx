import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import { AuthContext } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isLoggedIn,getCurrentSession,setIsLoggedIn} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
 
useEffect(() => {
  (async () => {
     const session = await getCurrentSession();
    setIsLoggedIn(session.isLoggedIn);
    setLoading(false);
  })();
}, []);

if (loading) {
  return null; 
}

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
      
          <Stack.Screen name="Main" component={HomeStack} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
