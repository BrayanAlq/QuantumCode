
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

export default function CalificacionDiaria({ visible, onClose }) {
  const [selectedFeeling, setSelectedFeeling] = useState('');

  const emojisCalif = ['💀', '😢', '😕', '🙂', '😊'];
  const emojisAnimo = ['😭', '🤔', '😕', '😠', '💀', '🤩', '🥲', '😳', '🥳'];

  const handleSelect = (emoji) => {
    setSelectedFeeling(emoji);
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
          <View style={styles.barraSuperior} />
          <View style={styles.innerContent}>
          <Text style={styles.title}>¿Cómo te fue hoy?</Text>
          <View style={styles.emojiCalificacion}>
            {emojisCalif.map((emoji, index) => (
              <TouchableOpacity key={index} onPress={() => handleSelect(emoji)}>
                <Text style={styles.emoji}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.title}>¿Cómo te sientes?</Text>
          <View style={styles.emojiEstadoAnimo}>
            {emojisAnimo.map((emoji, index) => (
              <TouchableOpacity key={index} onPress={() => handleSelect(emoji)}>
                <Text style={styles.emoji}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={onClose}>
            <Text style={styles.submitText}>Enviar</Text>
          </TouchableOpacity>

          {selectedFeeling !== '' && (
            <Text style={styles.selectedText}>Emoción seleccionada: {selectedFeeling}</Text>
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
    top: 0,
    left: 0,  
  },
  innerContent: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20, 
    marginTop: 60, 
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    marginTop: 30, 
  },
  emojiCalificacion: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  emojiEstadoAnimo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  emoji: {
    fontSize: 40,
    margin: 10,
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
    fontSize: 18,
  },
});
