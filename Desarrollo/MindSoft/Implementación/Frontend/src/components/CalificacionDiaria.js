
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDailyRating } from '../hooks/useDailyRating';
import { useMoodRating } from '../hooks/useMoodRating';
import * as SecureStore from 'expo-secure-store';

export default function CalificacionDiaria({ visible, onClose }) {
  const navigation = useNavigation();
  const [selectedFeeling, setSelectedFeeling] = useState('');
  const [selectedEmojis, setSelectedEmojis] = useState([]); 
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const { submitDailyRating, loading: dailyLoading, error: dailyError  } = useDailyRating();
  const { submitMoodRating, loading: moodLoading, error: moodError } = useMoodRating();
  
  const emojisCalif = [
    { emoji: '😖', label: 'Muy mal' },
    { emoji: '😢', label: 'Mal' },
    { emoji: '😕', label: 'Normal' },
    { emoji: '🙂', label: 'Bien' },
    { emoji: '😊', label: 'Excelente' },
  ];

  const emojisAnimo = [
    { emoji: '😔', label: 'Deprimido', id: 1 },
    { emoji: '😟', label: 'Inseguro', id: 2 },
    { emoji: '😬', label: 'Ansioso', id: 3 },
    { emoji: '😠', label: 'Enojado' , id: 4},
    { emoji: '😵‍💫', label: 'Exhausto' , id: 5},
    { emoji: '🤩', label: 'Eufórico', id: 6 },
    { emoji: '😌', label: 'Aliviado', id: 7 },
    { emoji: '😲', label: 'Sorprendido', id: 8 },
    { emoji: '😁', label: 'Feliz', id: 9 },
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
    if (selectedEmojis.includes(emoji)) {
      setSelectedEmojis(selectedEmojis.filter(item => item !== emoji)); 
    } else {
      if (selectedEmojis.length < 2) {
        setSelectedEmojis([...selectedEmojis, emoji]);
      } else {
        Alert.alert('Solo puedes seleccionar hasta 2 emociones');
      }
    }
  };



  const handleSubirCalificacion = async () => {
    const token = await SecureStore.getItemAsync('authToken');
    const rating = emojiToRating[selectedFeeling];
  
    if (!rating) {
      Alert.alert('Por favor selecciona un emoji de calificación');
      return;
    }

    const response = await submitDailyRating(rating, date, token);
  
    if (response && !response.error) {
      setSelectedFeeling(''); 
    } else {
      Alert.alert('Error', response.error || 'Algo salió mal');
    }
  };


  const handleEnviarEmociones = async () => {
    const token = await SecureStore.getItemAsync('authToken');

    if (selectedEmojis.length === 0) {
      Alert.alert('Por favor selecciona al menos una emoción');
      return;
    }

    try {
      const moodRating = {
        date: new Date().toISOString().split('T')[0], 
        mood_detail: selectedEmojis.map(emoji => ({ mood_id: emojisAnimo.find(item => item.emoji === emoji).id })) 
      };

      const response = await submitMoodRating(moodRating, token); 

      if (response && !response.error) {
        Alert.alert('Su calificación diaria se ah registrado con éxito');
        setSelectedEmojis([]); 
        navigation.navigate('NuevoObjetivo');
      } else {
        Alert.alert('Error', response.error || 'Algo salió mal');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al enviar las emociones');
    }
  };

  const handleSubmit = async () => {
    if (!selectedFeeling) {
      Alert.alert('Por favor complete el cuestionario de calificación ');
      return;
    }
  
    if (selectedEmojis.length === 0) {
      Alert.alert('Por favor selecciona al menos una emoción');
      return;
    }


    await handleSubirCalificacion();
    await handleEnviarEmociones();
    onClose();
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
              <View key={index} style={[styles.emojiContainer, selectedEmojis.includes(item.emoji) && styles.selectedEmojiContainer]}>
                <TouchableOpacity key={index} onPress={() => handleSelectAnimo(item.emoji)}>
                <Text style={styles.emoji}>{item.emoji}</Text>
                </TouchableOpacity>
                <Text style={[styles.emojiLabel, selectedEmojis.includes(item.emoji) && styles.selectedLabelText]}>{item.label}</Text>
              </View>
            ))}
          </View>
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Enviar</Text>
          </TouchableOpacity>
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
