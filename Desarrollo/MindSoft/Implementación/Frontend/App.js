import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "./src/components/barraMenu";


import PantallaBienvenida from "./src/screens/bienvenida";
import login from "./src/screens/login";
import Confirmacion from "./src/screens/Confirmacion";
import Perfil from "./src/screens/perfil";
import NuevoObjetivo from "./src/screens/nuevo_objetivo";
import ModificarObjetivo from "./src/screens/mod_objetivo";
import SeguimientoObjetivo from "./src/screens/seg_objetivos";
import Notas from "./src/screens/diario_notas";
import AgregarNotas from "./src/screens/diario_agregar";
import Estadisticas from "./src/screens/estadisticas";
import Recomendaciones from "./src/screens/recomendaciones";


  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();


  function MyStack() {
    return (
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="login"
          component={login}
          options={{
            title: "",
            headerTintColor: "white",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#0B72D2" },
          }}
        />

        <Stack.Screen
          name="Confirmacion"
          component={Confirmacion}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Welcome"
          component={PantallaBienvenida}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Perfil"
          component={Perfil}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="DiarioNotas"
          component={Notas}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SeguimientoObjetivo"
          component={SeguimientoObjetivo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Estadisticas"
          component={Estadisticas}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Recomendaciones"
          component={Recomendaciones}
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
          name="AgregarNotas"
          component={AgregarNotas}
          options={{ headerShown: false }}
        />

        

        

        
      </Stack.Navigator>
    );
  }

  export default function App() {
    return (
      
      <NavigationContainer>
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props}  /> } screenOptions={{
          drawerStyle: {
            width: 310, 
          },
        }} >
          <Drawer.Screen name="Home" component={MyStack} options={{ headerShown: false }} />
          <Drawer.Screen name="Perfil" component={Perfil} options={{ headerShown: false }}/>
          <Drawer.Screen name="DiarioNotas" component={Notas} options={{ headerShown: false }}/>
          <Drawer.Screen name="SeguimientoObjetivo" component={SeguimientoObjetivo} options={{ headerShown: false }}/>
          <Drawer.Screen name="Estadisticas" component={Estadisticas} options={{ headerShown: false }}/>
          <Drawer.Screen name="Recomendaciones" component={Recomendaciones} options={{ headerShown: false }} />
          <Drawer.Screen name="NuevoObjetivo" component={NuevoObjetivo} options={{ headerShown: false }} />
          <Drawer.Screen name="ModificarObjetivo" component={ModificarObjetivo} options={{ headerShown: false }} />
          <Drawer.Screen name="AgregarNotas" component={AgregarNotas} options={{ headerShown: false }} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
