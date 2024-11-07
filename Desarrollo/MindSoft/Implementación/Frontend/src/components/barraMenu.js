import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import {  DrawerContentScrollView } from '@react-navigation/drawer';



export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} style={styles.drawerContainer} >
      <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('DiarioNotas')} key="perfil" >
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
      
      
    </DrawerContentScrollView>
  );
}


const styles = StyleSheet.create({
    drawerContainer: {
        backgroundColor: '#0B72D2', 
        paddingTop: 15, 
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

});