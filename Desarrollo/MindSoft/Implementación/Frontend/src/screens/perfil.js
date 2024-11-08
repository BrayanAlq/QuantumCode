import React from 'react';
import { View, Text, TextInput, StyleSheet, Image ,TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Perfil({ navigation }) {

    const abrirMenu = () => {
        navigation.openDrawer(); 
    };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={abrirMenu}>
                <Ionicons name="menu" size={40} color="black" style={styles.menuIcon} paddingTop={5}  />
            </TouchableOpacity>
            <View style={styles.separator} />
        </View>
    <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
            <Ionicons name="person-circle-outline" size={170} color="black" />  
        </View>
        
        <Text style={styles.profileTitle}>Perfil de Estudiante</Text>
        
            <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={24} color="black" style={styles.icon} />
            <TextInput placeholder="Nombre" style={styles.input} />
            </View>
            
            <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={24} color="black" style={styles.icon} />
            <TextInput placeholder="Apellidos" style={styles.input} />
            </View>
            
            <View style={styles.inputContainer}>
            <Ionicons name="home-outline" size={24} color="black" style={styles.icon} />
            <TextInput placeholder="Dirección" style={styles.input} />
            </View>
            
            <View style={styles.inputContainer}>
            <Ionicons name="school-outline" size={24} color="black" style={styles.icon} />
            <TextInput placeholder="Facultad" style={styles.input} />
            </View>
            
            <View style={styles.inputContainer}>
            <Ionicons name="clipboard-outline" size={24} color="black" style={styles.icon} />
            <TextInput placeholder="Ponderado" style={styles.input} />
            </View>
        </View>
    </View>
);
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ADC0D1',
    paddingTop: 35,
    paddingHorizontal: 0,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#0B72D0',
    height: 50,
    paddingLeft: 10,
  },
  menuIcon: {
    color: 'black',
  },
  separator: {
    width: 4,
    height: 50,
    backgroundColor: '#ADC0D1',
    marginHorizontal: 10,
},
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  profileImageContainer: {
    alignItems:'center',
    marginBottom: 20,
    width:180,
    height:180,
    padding: 10,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0B72D2',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 8,
    padding: 10,
    width: '80%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});
