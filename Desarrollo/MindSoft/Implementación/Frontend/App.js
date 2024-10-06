import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import PantallaBienvenida from './src/screens/bienvenida'; 
//import Login from './src/screens/LoginScreen'; // Pantalla de login que puedes crear

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        {/* Pantalla de Bienvenida */}
        <Stack.Screen 
          name="Welcom" 
          component={PantallaBienvenida} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

