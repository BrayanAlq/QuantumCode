import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const logo = require("../../assets/usuario.png");
const logo2 = require("../../assets/candado.png");

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí puedes manejar la lógica de inicio de sesión
    console.log('Email:', email);
    console.log('Password:', password);

    navigation.navigate('Confirmacion');
  };

  return (
    <View style={styles.container}>
      <Svg
        style={{ marginBottom: 25 }} // Ajusta este valor para moverlo hacia arriba o abajo
        width="145"
        height="103"
        viewBox="0 0 145 103"
        fill="none"
      >
        <Path d="M33.5833 23C28.7557 23 24.7516 26.2031 23.6052 30.5312C23.476 30.5312 23.3792 30.5 23.25 30.5C17.5505 30.5 12.9167 34.9844 12.9167 40.5C12.9167 41.25 13.0135 41.9844 13.1911 42.6875C8.47656 44.5625 5.16667 49.0312 5.16667 54.25C5.16667 56.2188 5.68333 58.0469 6.50677 59.7031C2.63177 61.8594 0 65.8594 0 70.5C0 75.7031 3.29375 80.1719 7.97604 82.0469C7.83073 82.7656 7.75 83.5 7.75 84.25C7.75 90.4688 12.949 95.5 19.375 95.5C20.037 95.5 20.6828 95.4219 21.3125 95.3125C22.8625 99.7656 27.1573 103 32.2917 103C38.7177 103 43.9167 97.9688 43.9167 91.75V33C43.9167 27.4844 39.2828 23 33.5833 23ZM93 70.5C93 65.8594 90.3682 61.8594 86.4932 59.7031C87.3328 58.0469 87.8333 56.2188 87.8333 54.25C87.8333 49.0312 84.5234 44.5625 79.8089 42.6875C79.9703 41.9844 80.0833 41.25 80.0833 40.5C80.0833 34.9844 75.4495 30.5 69.75 30.5C69.6208 30.5 69.5078 30.5312 69.3948 30.5312C68.2484 26.2031 64.2443 23 59.4167 23C53.7172 23 49.0833 27.4688 49.0833 33V91.75C49.0833 97.9688 54.2823 103 60.7083 103C65.8427 103 70.1375 99.7656 71.6875 95.3125C72.3172 95.4219 72.963 95.5 73.625 95.5C80.051 95.5 85.25 90.4688 85.25 84.25C85.25 83.5 85.1693 82.7656 85.0239 82.0469C89.7062 80.1719 93 75.7031 93 70.5Z" fill="#0B72D2" />
        <Path d="M116.5 0C100.76 0 88 9.35357 88 20.8929C88 25.871 90.3835 30.4353 94.3457 34.0252C92.9496 39.0787 88.3006 43.5938 88.2449 43.644C88.1253 43.758 88.0453 43.9011 88.0148 44.0556C87.9843 44.2102 88.0047 44.3694 88.0734 44.5136C88.1421 44.6579 88.2561 44.7808 88.4013 44.8672C88.5465 44.9537 88.7166 44.9998 88.8906 45C96.2672 45 101.805 41.8108 104.543 39.8391C108.367 41.132 112.417 41.7914 116.5 41.7857C132.241 41.7857 145 32.4321 145 20.8929C145 9.35357 132.241 0 116.5 0ZM127.188 23.3036C127.188 23.5167 127.094 23.7211 126.927 23.8718C126.76 24.0225 126.533 24.1071 126.297 24.1071H120.062V29.7321C120.062 29.9453 119.969 30.1497 119.802 30.3004C119.635 30.4511 119.408 30.5357 119.172 30.5357H113.828C113.592 30.5357 113.365 30.4511 113.198 30.3004C113.031 30.1497 112.938 29.9453 112.938 29.7321V24.1071H106.703C106.467 24.1071 106.24 24.0225 106.073 23.8718C105.906 23.7211 105.812 23.5167 105.812 23.3036V18.4821C105.812 18.269 105.906 18.0646 106.073 17.9139C106.24 17.7632 106.467 17.6786 106.703 17.6786H112.938V12.0536C112.938 11.8405 113.031 11.6361 113.198 11.4854C113.365 11.3347 113.592 11.25 113.828 11.25H119.172C119.408 11.25 119.635 11.3347 119.802 11.4854C119.969 11.6361 120.062 11.8405 120.062 12.0536V17.6786H126.297C126.533 17.6786 126.76 17.7632 126.927 17.9139C127.094 18.0646 127.188 18.269 127.188 18.4821V23.3036Z" fill="#0B72D2" />
      </Svg>

      <Text style={styles.titulo}>MindSoft</Text>

      <View style={styles.hl} >

        <Image source={logo} style={styles.userImage} />

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.h2} >
        <Image source={logo2} style={styles.userImage} />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Inicio de sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADC0D1',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 33,
    paddingTop: 110,
  },

  titulo: {
    fontSize: 36,
    fontWeight: '600', // Usa '600' para semi-bold
    marginBottom: 50,
    fontWeight: 'bold',
  },

  input: {
    fontSize: 16,
    height: 44,
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 25,
    marginBottom: 40,
    paddingLeft: 10,
    borderRadius: 10,
    marginTop: -25
  },

  button: {
    backgroundColor: '#0B72D2', // Color de fondo
    padding: 10,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '50%',
    marginTop: 25,
  },

  buttonText: {
    color: 'black', // Color del texto
    fontSize: 16,
    fontWeight: 'regular',

  },

  userImage: {
    alignItems: 'left',
    width: 27,  // Cambia este valor para reducir el ancho
    height: 27, // Cambia este valor para reducir la altura
    marginBottom: 50, // Espacio entre la imagen y el título
    marginLeft: -15,
    marginTop: -12,
  },

  hl: {
    flexDirection: 'row',
    alignItems: 'left',
    fontSize: 16,
    height: 44,
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 25,
    marginBottom: 40,
    paddingLeft: 0,
    borderRadius: 10,
  },

  h2: {
    flexDirection: 'row',
    alignItems: 'left',
    fontSize: 16,
    height: 44,
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 25,
    marginBottom: 40,
    paddingLeft: 0,
    borderRadius: 10,
  }
});
