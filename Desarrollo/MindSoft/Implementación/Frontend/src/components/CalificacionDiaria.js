
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDailyRating } from '../hooks/useDailyRating';
import * as SecureStore from 'expo-secure-store';

export default function CalificacionDiaria({ visible, onClose }) {
  const navigation = useNavigation();
  const [selectedFeeling, setSelectedFeeling] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(''); 
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const { submitDailyRating, loading, error } = useDailyRating();

  const emojisCalif = [
    { emoji: '😖', label: 'Muy mal' },
    { emoji: '😢', label: 'Mal' },
    { emoji: '😕', label: 'Normal' },
    { emoji: '🙂', label: 'Bien' },
    { emoji: '😊', label: 'Excelente' },
  ];

  const emojisAnimo = [
    { emoji: '😔', label: 'Deprimido' },
    { emoji: '😟', label: 'Inseguro' },
    { emoji: '😬', label: 'Ansioso' },
    { emoji: '😠', label: 'Enojado' },
    { emoji: '😵‍💫', label: 'Exhausto' },
    { emoji: '🤩', label: 'Eufórico' },
    { emoji: '😌', label: 'Aliviado' },
    { emoji: '😲', label: 'Sorprendido' },
    { emoji: '😁', label: 'Feliz' },
  ];

  const emojiToRating = {
    '😖': 1,
    '😢': 2,
    '😕': 3,
    '🙂': 4,
    '😊': 5,
  };

  const handleSelect = (emoji) => {
    setSelectedFeeling(emoji);
  };

  const handleSelectAnimo = (emoji) => {
    setSelectedEmoji(emoji); 
  };



  const handleSubirCalificacion = async () => {
    const token = await SecureStore.getItemAsync('authToken');
    const rating = emojiToRating[selectedFeeling];
  
    if (!rating) {
      Alert.alert('Por favor selecciona un emoji');
      return;
    }
  
    const response = await submitDailyRating(rating, date, token);
  
    if (response && !response.error) {
      Alert.alert('Calificación enviada con éxito');
      setSelectedFeeling(''); 
      onClose();
      navigation.navigate('SeguimientoObjetivo');
    } else {
      Alert.alert('Error', response.error || 'Algo salió mal');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.barraSuperior}>
              <Text style={styles.barraSuperiorText}>Califica tu día!!</Text>  
          </View>
          <View style={styles.innerContent}>
          <Text style={styles.title}>¿Cómo te fue hoy?</Text>
          <View style={styles.emojiCalificacion}>
            {emojisCalif.map((item, index) => (
              <View key={index} style={[styles.emojiContainer, selectedFeeling === item.emoji && styles.selectedEmojiContainer1]}>
                <TouchableOpacity key={index} onPress={() => handleSelect(item.emoji)}>
                <Text style={styles.emoji1}>{item.emoji}</Text>
                </TouchableOpacity>
                <Text style={[styles.emojiLabel, selectedFeeling === item.emoji && styles.selectedLabelText]}>{item.label}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.title}>¿Cómo te sientes?</Text>
          <View style={styles.emojiEstadoAnimo}>
            {emojisAnimo.map((item, index) => (
              <View key={index} style={[styles.emojiContainer, selectedEmoji === item.emoji && styles.selectedEmojiContainer]}>
                <TouchableOpacity key={index} onPress={() => handleSelectAnimo(item.emoji)}>
                <Text style={styles.emoji}>{item.emoji}</Text>
                </TouchableOpacity>
                <Text style={[styles.emojiLabel, selectedEmoji === item.emoji && styles.selectedLabelText]}>{item.label}</Text>
              </View>
            ))}
          </View>
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubirCalificacion}>
            <Text style={styles.submitText}>Enviar</Text>
          </TouchableOpacity>

          {selectedFeeling !== '' && (
            <Text style={styles.selectedText}>Calificación seleccionada: {selectedFeeling}</Text>
          )}
          {selectedEmoji !== '' && (
            <Text style={styles.selectedText}>Emoción seleccionada: {selectedEmoji}</Text>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#ADC0D1',
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative',
  },
  
  barraSuperior: {
    width: '100%', 
    height: 60,
    backgroundColor: '#0B72D2',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'absolute',  
    alignItems: 'center',
  },
  barraSuperiorText: {
    fontSize: 20,
    fontWeight: '900',
    color:'#ffff',
    marginBottom: 10,
    marginTop: 20,
    letterSpacing: 1.5,  
  },
  innerContent: {
    width: '100%',
    backgroundColor: 'white',
    padding: 10, 
    marginTop: 60, 
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
    marginTop: 10, 
  },
  emojiCalificacion: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    marginLeft:10,
    
  },
  emojiEstadoAnimo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  selectedEmojiContainer: {
    borderColor: '#0B72D2', 
    borderWidth: 3, 
    borderRadius: 10,  
  },
  selectedEmojiContainer1: {
    borderColor: '#FFD166', 
    borderWidth: 3, 
    borderRadius: 20, 
    width:80, 
  },
  selectedLabelText: {
    color: '#0B72D2', 
    fontWeight: 'bold', 
  },
  emojiContainer: {
    alignItems: 'center',
    marginHorizontal: 3,
    width: 80, 
    height: 100,
  },
  
  emoji: {
    fontSize: 35,
    margin: 10,
  },
  emoji1: {
    fontSize: 32,
    margin: 10,
  },
  emojiLabel: {
    fontSize: 12,
    color: '#555',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#0B72D2',
    padding: 10,
    borderRadius: 10,
  },
  submitText: {
    color: 'white',
    fontSize: 18,
  },
  selectedText: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: '500',
  },
});
