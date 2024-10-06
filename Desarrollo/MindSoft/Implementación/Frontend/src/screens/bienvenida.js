
import React, { useState } from 'react';
import { View, Text,Image,TouchableOpacity, StyleSheet } from 'react-native';
import CalificacionDiaria from '../components/CalificacionDiaria'; // Importamos el componente


export default function PantallaBienvenida() {
  const [emojiPopupVisible, setEmojiPopupVisible] = useState(false);

  return (
    <View style={styles.container}>
      
      <Image source={require('./../../assets/logo.png')} style={styles.icon1} resizeMode="contain"/>

      
      <Text style={styles.welcomeText}>Bienvenido a Mindsoft</Text>
      <Text style={styles.subText}>Déjanos saber cómo te encuentras el día de hoy!!</Text>
      
      
      <TouchableOpacity 
        style={styles.openButton} 
        onPress={() => setEmojiPopupVisible(true)}
      >
        <Text style={styles.buttonText}>Seleccionar emociones</Text>
      </TouchableOpacity>

     
      <CalificacionDiaria 
        visible={emojiPopupVisible} 
        onClose={() => setEmojiPopupVisible(false)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#88BEE3',
    paddingHorizontal: 40,
  },
  welcomeText: {
    fontSize: 40,
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 70,
    fontWeight:'bold',
  },
  subText: {
    fontSize: 20,
    color:'#0B72D2',
    marginBottom:25,
    textAlign:'center',
    fontWeight:'bold',
  },
  openButton: {
    backgroundColor: '#0B72D2',
    marginTop:50,
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  icon1: {
    width: 150, 
    height: 150,
    marginLeft: 45,
  },

});
