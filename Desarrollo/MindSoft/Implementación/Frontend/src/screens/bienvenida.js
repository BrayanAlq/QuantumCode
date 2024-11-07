import React, { useState,useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert,ActivityIndicator } from 'react-native';
import CalificacionDiaria from '../components/CalificacionDiaria';
import useMoodRating from '../hooks/useCheckDailyRating';


export default function PantallaBienvenida({ navigation }) {
  const [emojiPopupVisible, setEmojiPopupVisible] = useState(false);
  const { status, loading, error } = useMoodRating();
  const [isLoading, setIsLoading] = useState(true);
  


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!loading && status !== null) {
        if (!status) {
          navigation.replace('NuevoObjetivo');
        } else {
          setEmojiPopupVisible(true);
        }
      }
    }, 6000); 

    return () => clearTimeout(timer);
  }, [loading, status, navigation]);


  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Ocurrió un error: {error}</Text>
      </View>
    );
  }



  return (
    <View style={styles.container}>
      <Image source={require('./../../assets/logo.png')} style={styles.icon1} resizeMode="contain" />

      <Text style={styles.welcomeText}>Bienvenido a Mindsoft</Text>
      <Text style={styles.subText}>Déjanos saber cómo te encuentras el día de hoy!!</Text>

      {isLoading ? (
        <>
          
          <ActivityIndicator size="large" color="#0B72D2" />
          <Text style={styles.loadingText}>Cargando...</Text> 
        </>
      ) :(

      emojiPopupVisible && (
        <CalificacionDiaria
          visible={emojiPopupVisible}
          onClose={() => setEmojiPopupVisible(false)}
        />
      )
      )}
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
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 20,
    color: '#0B72D2',
    marginBottom: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  loadingText: {
    fontSize: 15,
    color: '#black',
    fontWeight: 'semibold',
    marginTop: 20, 
    textAlign: 'center',
  },
  icon1: {
    width: 150,
    height: 150,
    marginLeft: 45,
  },
});