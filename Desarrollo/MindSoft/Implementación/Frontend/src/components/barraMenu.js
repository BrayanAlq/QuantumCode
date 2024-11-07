import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import {  DrawerContentScrollView } from '@react-navigation/drawer';



export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('DiarioNotas')} >
        <Image source={require('../../assets/userlogo.png')} style={styles.iconos} resizeMode="contain" />
        <Text style={styles.drawerLabel}>Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('DiarioNotas')}>
        <Image source={require('../../assets/notaslogo.png')} style={styles.iconos} resizeMode="contain" />
        <Text style={styles.drawerLabel}>Diario</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('SeguimientoObjetivo')}>
        <Image source={require('../../assets/objetivoslogo.png')} style={styles.iconos} resizeMode="contain" />
        <Text style={styles.drawerLabel}>Seguimiento de objetivos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('Estadisticas')}>
        <Image source={require('../../assets/estadisticaslogo.png')} style={styles.iconos} resizeMode="contain" />
        <Text style={styles.drawerLabel}>Estadísticas</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('Recomendaciones')}>
        <Image source={require('../../assets/recomendaciones.png')} style={styles.iconos} resizeMode="contain" />
        <Text style={styles.drawerLabel}>Recomendaciones</Text>
      </TouchableOpacity>
      
      
    </DrawerContentScrollView>
  );
}


const styles = StyleSheet.create({
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  drawerLabel: {
    fontSize: 16,
    marginLeft: 15,
  },
  iconos: {
    width: 20,
    height: 20,
    marginLeft: 45,
  },

});