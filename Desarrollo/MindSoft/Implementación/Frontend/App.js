import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
//import Login from './src/screens/LoginScreen'; // Pantalla de login que puedes crear

import PantallaBienvenida from './src/screens/bienvenida'; 
import login from './src/screens/login';
import Confirmacion from './src/screens/Confirmacion';

export default function App() {
  
  const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>

      <Stack.Screen name="login" component={login} 
        options={{
         title: "",
          headerTinteColor: "white",
         headerTitleAling: "center",
          headerStyle: { backgroundColor: "#0B72D2"},
        }}
        />

      <Stack.Screen name="Confirmacion" component={Confirmacion}
      options={{
        headerShown: false, 
      }} />

      <Stack.Screen 
          name="Welcome" 
          component={PantallaBienvenida} 
          options={{ headerShown: false }}
        />

      
      
    </Stack.Navigator>
  );
}

  return (
   <NavigationContainer>
    <MyStack/>
   </NavigationContainer>
  );
}
