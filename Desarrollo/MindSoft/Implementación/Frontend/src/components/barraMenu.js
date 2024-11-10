import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image,BackHandler } from 'react-native';
import {  DrawerContentScrollView } from '@react-navigation/drawer';
import { logout } from '../services/auth';


export default function CustomDrawerContent(props) {


  const handleLogout = () => {
    logout(props.navigation);
  };

  return (
    <DrawerContentScrollView {...props} style={styles.drawerContainer} >
      <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('Perfil')} key="perfil" >
        <Image source={require('../../assets/userlogo.png')} style={styles.iconos} resizeMode="contain" />
        <Text style={styles.drawerLabel}>Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('DiarioNotas')} key="diario">
        <Image source={require('../../assets/notaslogo.png')} style={styles.iconos} resizeMode="contain" />
        <Text style={styles.drawerLabel}>Diario</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('SeguimientoObjetivo')} key="seguimientoObjetivo" >
        <Image source={require('../../assets/objetivoslogo.png')} style={styles.iconos} resizeMode="contain" />
        <Text style={styles.drawerLabel}>Seguimiento de objetivos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('Estadisticas')} key="estadisticas">
        <Image source={require('../../assets/estadisticaslogo.png')} style={styles.iconos} resizeMode="contain" />
        <Text style={styles.drawerLabel}>Estadísticas</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('Recomendaciones')} key="recomendaciones">
        <Image source={require('../../assets/recomendaciones.png')} style={styles.iconos} resizeMode="contain" />
        <Text style={styles.drawerLabel}>Recomendaciones</Text>
      </TouchableOpacity>
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} key="salir">
          <Image source={require('../../assets/salir.png')} style={styles.iconos} resizeMode="contain" />
          <Text style={styles.drawerLabel}>Salir</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}


const styles = StyleSheet.create({
    drawerContainer: {
        backgroundColor: '#0B72D2', 
        paddingTop: 15, 
        borderTopRightRadius:35,
        borderBottomRightRadius:35,
        overflow: 'hidden',
        flexGrow: 1,
},
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingLeft: 15,
    paddingRight:5,
  },
  drawerLabel: {
    fontSize: 16,
    fontWeight:'bold',
    marginLeft: 10,
    color: 'white', 
  },
  iconos: {
    width: 20,
    height: 20,
    marginLeft: 0,
  },
  logoutContainer: {
    borderLeftWidth: 10,
    paddingVertical: 0,
    marginTop: 400, 
  },

  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingLeft: 15,
    paddingRight: 5,
    backgroundColor: '#5A9BD8', 
  },
});