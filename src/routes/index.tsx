import React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackNavigatorParams } from '../typings/screens';

// screens
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import UsersScreen from '../screens/UsersScreen';
import WebviewScreen from '../screens/WebviewScreen';
import { Colors } from '../constants';

const Stack = createNativeStackNavigator<RootStackNavigatorParams>();

export default function RootNavigation() {
  const setHeaderVisible = (route: RouteProp<RootStackNavigatorParams>) => {
    switch (route.name) {
      case 'Login':
        return false;
      default:
        return true;
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ route }) => ({
          headerShown: setHeaderVisible(route),
          headerTintColor: Colors.MAIN,
        })}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Users" component={UsersScreen} />
        <Stack.Screen name="Webview" component={WebviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
