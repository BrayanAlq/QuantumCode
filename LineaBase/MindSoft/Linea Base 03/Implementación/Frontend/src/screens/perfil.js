import React from 'react';
import { View, Text, TextInput, StyleSheet, Image ,TouchableOpacity,ActivityIndicator} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUserInfo } from '../hooks/useUser'; 


export default function Perfil({ navigation }) {
  const { userInfo, loading, error } = useUserInfo();

    if (loading) {
        return <ActivityIndicator size="large" color="#0B72D2" style={styles.loading} />;
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

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
              <Ionicons name="person-outline" size={24} color="#0B72D2" style={styles.icon} />
              <TextInput placeholder="Nombre"  value={userInfo?.first_name || ''} style={styles.input} editable={false} />
            </View>
            
            <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={24} color="#0B72D2" style={styles.icon} />
            <TextInput placeholder="Apellidos" value={userInfo?.last_name || ''} style={styles.input} editable={false}/>
            </View>
            
            <View style={styles.inputContainer}>
            <Ionicons name="home-outline" size={24} color="#0B72D2" style={styles.icon} />
            <TextInput placeholder="Dirección" value={userInfo?.address || ''} style={styles.input} editable={false} />
            </View>
            
            <View style={styles.inputContainer}>
            <Ionicons name="school-outline" size={24} color="#0B72D2" style={styles.icon} />
            <TextInput placeholder="Facultad" value={userInfo?.faculty || ''} style={styles.input} editable={false} />
            </View>
            
            <View style={styles.inputContainer}>
            <Ionicons name="clipboard-outline" size={24} color="#0B72D2" style={styles.icon} />
            <TextInput placeholder="Ponderado" value={String(userInfo?.average || '')} style={styles.input} editable={false} />
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
    color: 'black',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
