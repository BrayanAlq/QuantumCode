import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import ListaObjetivos from '../components/listaObjetivos/ListaObjetivos';

const SeguimientoObjetivo = () => {
  return (
    <View style={styles.container}>
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
  },
  contentContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    marginBottom: 20,
  },
});

export default SeguimientoObjetivo;
