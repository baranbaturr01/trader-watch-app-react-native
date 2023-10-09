import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import Onboarding from './screens/Onboarding';
import BottomTabNavigator from './BottomTabNavigator/BottomTabNavigator';
import Login from './screens/Auth/Login';

const Stack = createNativeStackNavigator();

export function App() {
  const [token, setToken] = useState(null);

  // Kullanıcı token'ı aldığında bu işlevi çağırın
  const handleLogin = (userToken) => {
    setToken(userToken);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {token ? (
          <Stack.Screen
            name="BottomTabs"
            component={BottomTabNavigator}
          />
        ) : (
          <>
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen
              name="Login"
              options={{ presentation: 'modal' }}
            >
              {(props) => (
                <Login {...props} onLogin={handleLogin} />
              )}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
