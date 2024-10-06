
import React, { Component,useEffect } from 'react'
import { Text, StyleSheet, View , Image} from 'react-native'

const logo3 = require("../../assets/cheque.png");

export default function Home({ navigation }){
  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Welcome'); 
    }, 3000); 

    return () => clearTimeout(timer); 
  }, [navigation]);

    return (
      <View style = {styles.container}>
        <Image source={logo3} style={styles.userImage} />
        <Text style={styles.msj}>Inicio de sesión exitoso</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#88BEE3',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 33,
    paddingTop: 50,
  },
  userImage:{
    width: 250,
    height: 250,
    marginTop: 120,
  },
  msj: {
    fontSize: 36,
    fontWeight: 'regular',
    marginTop: 30,
    textAlign: 'center'
  }


});

