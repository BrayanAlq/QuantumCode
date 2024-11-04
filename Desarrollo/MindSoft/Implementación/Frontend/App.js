import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
//import Login from './src/screens/LoginScreen'; // Pantalla de login que puedes crear

import PantallaBienvenida from './src/screens/bienvenida';
import login from './src/screens/login';
import Confirmacion from './src/screens/Confirmacion';
import NuevoObjetivo from './src/screens/nuevo_objetivo';
import ModificarObjetivo from './src/screens/mod_objetivo';
import SeguimientoObjetivo from './src/screens/seg_objetivos';
import Recomendacion from './src/screens/recomendaciones';
import Notas from './src/screens/diario_notas';
import AgregarNotas from './src/screens/diario_agregar';

export default function App() {

  const Stack = createStackNavigator();

  function MyStack() {
    return (
      <Stack.Navigator initialRouteName='login'>

        <Stack.Screen
          name="login"
          component={login}
          options={{
            title: "",
            headerTinteColor: "white",
            headerTitleAling: "center",
            headerStyle: { backgroundColor: "#0B72D2" },
          }}
        />

        <Stack.Screen
          name="Confirmacion"
          component={Confirmacion}
          options={{ headerShown: false,}}
        />

        <Stack.Screen
          name="Welcome"
          component={PantallaBienvenida}
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name="SeguimientoObjetivo" 
          component={SeguimientoObjetivo} 
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name="NuevoObjetivo" 
          component={NuevoObjetivo} 
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name="ModificarObjetivo" 
          component={ModificarObjetivo} 
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Recomendacion" 
          component={Recomendacion} 
          options={{ headerShown: false }}/>

        <Stack.Screen
          name="DiarioNotas" 
          component={Notas} 
          options={{ headerShown: false }}/>

        <Stack.Screen
          name="AgregarNotas" 
          component={AgregarNotas} 
          options={{ headerShown: false }}/>


        </Stack.Navigator>



    );
  }

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
