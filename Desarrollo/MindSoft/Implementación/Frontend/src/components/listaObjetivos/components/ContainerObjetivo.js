import React from 'react';
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { CalendarIcon, EditIcon, TrashIcon, CheckIcon } from "../../../icons";
import { useGoals } from "../../../hooks/useGoal";

export function ContainerObjetivo({ item, navigation }) {
  const { deleteGoal } = useGoals();

  const handleEdit = () => {
    navigation.navigate('ModificarObjetivo', {
      goalId: item.goal_id,
      title: item.titulo,
      date: item.fecha,
      time: item.plazo});
  };

  const handleDelete = () => {
    Alert.alert(
      'Eliminar Objetivo',
      '¿Estás seguro de que deseas eliminar este objetivo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              await deleteGoal(item.goal_id); // Llama a la función deleteGoal
              Alert.alert('Éxito', 'Objetivo eliminado correctamente');
            } catch (error) {
              Alert.alert('Error', error.message);
            }
          }
        }
      ]
    );
  };
  
  return (
    <View className="rounded-xl justify-between p-4 bg-white w-full h-36 mb-4">
      <View className="flex-row gap-2">
        <CalendarIcon className="text-black" />
        <Text>{item.titulo}</Text>
      </View>
      <View className="flex-row justify-between items-center">
        <Text>Fecha: {item.fecha}</Text>
        <View className="flex-row gap-2">
          <CheckIcon className="text-black" />
          <TouchableOpacity onPress={handleEdit}>
            <EditIcon className="text-black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <TrashIcon className="text-black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
