import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { ContainerObjetivo } from "./components";
import { useGoals } from "../../hooks/useGoal"
import { PlusCircleIcon } from "../../icons/PlusCircleIcon"
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

export default function ListaObjetivos() {
  const { goals, loading, error, fetchGoals } = useGoals();
  const navigation = useNavigation();
  const route = useRoute();

  useFocusEffect(
    React.useCallback(() => {
      fetchGoals(); // Llama a fetchGoals cada vez que la pantalla está en foco
    }, [fetchGoals])
  );

  useEffect(() => {
    fetchGoals(); // Llama a fetchGoals al montar el componente
  }, []);

  useEffect(() => {
    if (route.params?.refresh) {
      fetchGoals(); // Llama a fetchGoals si hay un parámetro de refresco
    }
  }, [route.params?.refresh]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Objetivos</Text>
      <FlatList
        style={styles.listaObjetivos}
        data={goals}
        keyExtractor={item => item.goal_id.toString()}
        renderItem={({ item }) => (
        <ContainerObjetivo
          item={{
            titulo: item.goal_name,
            fecha: item.start_date,
            goal_id: item.goal_id,
            plazo: item.duration_days,
          }}
          navigation={navigation}
          />
        )}
      />
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('NuevoObjetivo', { userId: 'ID_DEL_USUARIO' })} // Reemplaza 'ID_DEL_USUARIO' con el ID real
      >
        <PlusCircleIcon
          size={72}
          color="#0B72D2" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: "#0B72D2",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ADC0D1",
    padding: 32,
  },
  listaObjetivos: {
    width: "100%",
    marginVertical: 16,
  },
})
