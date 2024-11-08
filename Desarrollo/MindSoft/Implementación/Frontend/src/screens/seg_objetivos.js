import React from 'react';
import { View, StyleSheet, FlatList,TouchableOpacity } from 'react-native';
import ListaObjetivos from '../components/listaObjetivos/ListaObjetivos';
import { Ionicons } from '@expo/vector-icons';

const SeguimientoObjetivo = ({ navigation }) => {
  
  
  const abrirMenu = () => {
    navigation.openDrawer(); 
};
  
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
                <TouchableOpacity onPress={abrirMenu}>
                    <Ionicons name="menu" size={40} color="black" paddingTop={5} />
                </TouchableOpacity>
                    <View style={styles.separator} />
            </View>
      <FlatList
        data={[]} // Aquí puedes pasar datos si los necesitas
        keyExtractor={(_, index) => index.toString()} // Cambia a un key real si tienes
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            {/* Aquí puedes añadir el contenido que necesites */}
          </View>
        )}
        ListFooterComponent={<ListaObjetivos />}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
    backgroundColor: '#ADC0D1',
    paddingTop:35,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#0B72D0',
    height: 50,
    paddingLeft: 10,
},
separator: {
  width: 4,
  height: 50,
  backgroundColor: '#ADC0D1',
  marginHorizontal: 10,
},
  contentContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    marginBottom: 20,
  },
});

export default SeguimientoObjetivo;
