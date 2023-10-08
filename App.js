import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Splash from './screens/Splash';
import BottomTabNavigator from './BottomTabNavigator/BottomTabNavigator';
import Login from './screens/Auth/Login';

const Stack = createNativeStackNavigator();

export function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen name="Splash" initialRouteName="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="BottomTabs" component={BottomTabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App